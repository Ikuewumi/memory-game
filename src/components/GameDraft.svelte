<script lang="ts">
    import type { Data } from "@/types";
    import Card from "./Card.svelte";
    import Image from "./Image.svelte";
    import { onMount } from "svelte";
    import {
        gameData,
        gameStatus,
        enterData,
        cardsList,
        startGame,
        clickCard,
        focusData,
    } from "@stores/game";
    import GameStatus from "./GameStatus.svelte";

    const startDraftGame = async () => {
        const TEST_URL = "/memory-game/test.json";
        const res: Data = await (await fetch(TEST_URL)).json();

        return res;
    };

    onMount(async () => {
        const { questions, image, text } = await startDraftGame();
        enterData(questions, image, text);
        startGame();
    });

    const click = (index: number) => {
        return () => clickCard(index);
    };
</script>

<GameStatus />
<div class="draft">
    {#if $gameData.image > ""}
        <Image src={$gameData.image} alt="Alternative Text" />
    {/if}
    <div class="draft-main" data-focus={$focusData.state} >
        <ul class="card-list">
            {#each $cardsList as card, i (i)}
                <li class="card-li">
                    <Card
                        text={card.text}
                        on:click={click(i)}
                        chosen={$focusData.cards.includes(i)}
                        disabled={!$gameStatus.gameStarted}
                    />
                </li>
            {/each}
        </ul>
    </div>
</div>

<style lang="scss">
    .draft {
        display: flex;
        flex-direction: column;
        gap: 2rem 0.5rem;
        padding-block: var(--space-xs) var(--space-l);
        grid-column: full;

        @media (min-width: 768px) {
            flex-direction: row;
            grid-column: content;
        }
    }
    .draft-main {
        width: 100%;
        --bg: var(--clr-white);
        --clr: var(--clr-black);
        --delay: 0ms;
        &[data-focus="focus"] {
            --bg: var(--clr-gray-900);
            --clr: var(--clr-gray-300);
            --delay: 0ms;
        }
        &[data-focus="success"] {
            --bg: hsl(120deg 34% 39%);
            --clr: var(--clr-gray-300);
        }
        &[data-focus="failure"] {
            --bg: hsl(0deg 40% 51%);
            --clr: var(--clr-gray-300);
        }
    }

    .card-list {
        display: grid;
        list-style: none;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-3xs);
        font-size: var(--step-0);
        padding-inline: var(--space-2xs);

        @media (min-width: 768px) {
            flex-direction: column;
            padding-inline: 0;
            font-size: var(--step-n1);
        }
    }

    .card-li {
        display: contents;
    }
</style>
