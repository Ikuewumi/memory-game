<script lang="ts">
    import CuizOptions from "./CuizOptions.svelte";
    import { modals, DEFAULT_MODAL_STATES } from "@/stores/modals";
    import GameDraft from "./GameDraft.svelte";
    import { decodeString, sleep, zUrlString } from "@/composables/engine";
    import type { GameData, ImageFile, Metadata, Question } from "@/types";
    import { enterData, gameStatus, resetGame, startGame } from "@/stores/game";
    import { blitzSecondsIndex, selectedMode } from "@/stores/modes";
    import CuizMetrics from "./CuizMetrics.svelte";
    import { showMessage, writeMessage } from "@/stores/toast";
    import { onMount } from "svelte";

    export let cuizDataString: string;
    export let slug: string;
    let cuizData: GameData & Metadata = JSON.parse(
        decodeString(cuizDataString),
    );

    onMount(() => {
        cuizData = JSON.parse(decodeString(cuizDataString));
    });

    const checkImages = async (
        pageSlug: string,
        cover: string = "",
        questions: Question[],
    ) => {
        const controller = new AbortController();
        const output = {
            ok: false,
            multipleImages: false,
            data: {
                image: "",
                text: "",
                questions: [],
            } as GameData,
        };

        try {
            writeMessage("...Loading images");
            let json: ImageFile = {};
            const imageInQuestions = questions.find(
                (question) => "image" in question,
            );
            if (imageInQuestions) output.multipleImages = true;
            if (cover > "" || imageInQuestions) {
                const res = await fetch(`/_images/${pageSlug}.json`, {
                    signal: controller.signal,
                });
                json = await res.json();
            }

            if (cover > "") {
                output.data.image = json[zUrlString.parse(cover)];
            }
            output.data.questions = questions.map((question) => {
                if (
                    "image" in question &&
                    Object.hasOwn(json, zUrlString.parse(question.image))
                ) {
                    return {
                        ...question,
                        image: json[zUrlString.parse(question.image)],
                    };
                }

                if ("text" in question) {
                    output.multipleImages = true
                }

                return { ...question };
            });

            writeMessage("");
            output.ok = true;
            return output;
        } catch (e: any) {
            console.error(e); // TODO- comment out before production
            showMessage(`❌ Could not load all images, Try again.`);
            controller.abort();
            output.ok = false;
            return output;
        }
    };

    const showOptions = () => modals.setKey("options", true);
    const start = async () => {
        resetGame();
        const { ok, multipleImages, data } = await checkImages(
            slug,
            cuizData.image,
            cuizData.questions,
        );
        if (!ok) return;
        enterData(data.questions, data.image, cuizData.text ?? "");

        gameStatus.setKey("multipleImages", multipleImages);

        modals.set({ ...DEFAULT_MODAL_STATES, game: true });
        await sleep(400);
        startGame();
    };

    const startWithOptions = (
        e: CustomEvent<{ modeIndex: number; timeIndex: number }>,
    ) => {
        selectedMode.set(e.detail.modeIndex);
        blitzSecondsIndex.set(e.detail.timeIndex);
        start();
    };
</script>

{#if cuizData}
    <button class="cuiz-walkthrough-play" on:click={showOptions}> Play </button>

    <CuizOptions on:start-game={startWithOptions} />
    <GameDraft />
    <CuizMetrics />
{/if}

<style lang="scss">
    .cuiz-walkthrough {
        &-play {
            padding: 0.6rem 1.75rem 0.7rem;
            cursor: pointer;
            justify-self: end;
            font-size: var(--step-2);
            font-weight: 700;
            text-transform: uppercase;
            border-radius: 0.5rem;
            letter-spacing: 0.5px;
            margin-block: 2rem 1rem;
            background: var(--clr-gray-200);
            color: var(--clr-gray-800);
            border: none;
            position: relative;
            isolation: isolate;
            outline: none;
            transition: 75ms ease-in-out;

            &:hover {
                box-shadow: 0 2px 20px -7px;
                color: var(--clr-gray-900);
            }

            &::before,
            &::after {
                content: "";
                position: absolute;
                inset: -0.25rem -0.23rem;
                background: var(--text-gradient);
                border-radius: calc(1.2 * 0.5rem);
                z-index: -1;
            }

            &::after {
                inset: 0;
                background: var(--clr-white);
                border-radius: inherit;
                box-shadow: 0 0 4px 5px hsl(var(--clr-shadow-dark) / 100%);
            }

            &:focus-visible {
                outline-offset: -7px;
                outline: 2px solid currentColor;
            }
        }
    }
</style>
