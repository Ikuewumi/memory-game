<script lang="ts">
    import { clickDcqCard, gameData, randomQuestionIndex } from "@stores/game";
    const click = (userAnswer: boolean) => {
        return clickDcqCard($randomQuestionIndex, userAnswer);
    };

</script>

{#if $gameData.questions.length > 0}
    <div class="dcq">
        {#if $gameData.text || $gameData.image}
            <figure class="dcq-figure">
                {#if $gameData.image > ""}
                    <img src={$gameData.image} alt="" class="dcq-image" />
                {/if}
                {#if $gameData.text > ""}<figcaption class="dcq-text">
                        {$gameData.text}
                    </figcaption>
                {/if}
            </figure>
        {/if}

        <span class="dcq-question-text">
            {$gameData.questions[$randomQuestionIndex].question}
        </span>
        <div class="dcq-button-bar">
            <button class="dcq-button" on:click={() => click(true)}
                ><em>T</em>rue ✅</button
            >
            <button class="dcq-button" on:click={() => click(false)}
                ><em>F</em>alse ❌</button
            >
        </div>
    </div>
{/if}

<style lang="scss">
    .dcq {
        --c-img-width: var(--img-width, 100px);
        --c-img-height: var(--img-height, min(400px, 80vw));
        display: grid;
        place-items: center;
        place-content: center;
        gap: 1rem;
        width: 100%;
        font-size: var(--step-1);

        &-figure {
            display: flex;
            flex-flow: column wrap;
            place-items: center;
            place-content: center;
        }

        &-image {
            max-width: var(--c-img-height);
            max-height: min(400px, 50vh);
            object-fit: contain;
            border-radius: 0.4rem;
            outline: 5px solid hsl(var(--shadow-color-dark) / 50%); 
            background: var(--clr-white);
            box-shadow: 0 1px 5px -4px hsl(var(--shadow-color) 40% / 70%);
            z-index: var(--z-home);

        }

        &-text {
            width: min(400px, 75vw);
            aspect-ratio: 16 / 8;

            background: var(--clr-white);
            outline: 1px solid hsl(var(--shadow-color-dark) / 20%);
            padding: 0.5rem 0.75rem 0.75rem;
            border-radius: 0.5rem;
            line-height: 1.25;    
 
        }

        &-image + &-text {
            aspect-ratio: inherit;
            font-size: var(--step-n1);
            margin-top: -5px;
            padding: calc(0.5rem + 5px) 0.75rem 0.75rem;
            width: fit-content;
        }

        &-question-text {
            width: min(400px, 75vw);
            aspect-ratio: 16 / 8;

            background: var(--clr-white);
            outline: 1px solid hsl(var(--shadow-color-dark) / 20%);
            padding: 0.5rem 0.75rem 0.75rem;
            border-radius: 0.5rem;
            line-height: 1.25;    
        }

        &-figure + &-question-text {
            aspect-ratio: inherit;
        }

        &-button-bar {
            display: flex;
            flex-flow: row wrap;
            place-items: center;
            place-content: center;
            gap: 0.75rem;
        }

        &-button {
            display: flex;
            place-items: center;
            place-content: center;
            background: var(--clr-white);
            border-radius: 0.5rem;
            border: 1px solid hsl(var(--shadow-color-dark) / 20%);
            outline: 0;
            box-shadow: 0 0.5px 5px -4px hsl(var(--shadow-color-dark) / 10%);
            padding: 0.45rem 1.5rem 0.55rem;
            font-size: var(--step-1);
            cursor: pointer;

            &:focus-visible {
                outline: 2px solid;
                outline-offset: -5px;
            }

            em {
                font-weight: 600;
            }
        }
    }
</style>
