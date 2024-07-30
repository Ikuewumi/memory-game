<script lang="ts">
    import Card from "./Card.svelte";
    import Image from "./Image.svelte";
    import { onDestroy } from "svelte";
    import { modals } from "@stores/modals";
    import { gameKeys } from "@stores/keymaps"
    import {
        gameStatus,
        cardsList,
        clickCard,
        focusData,
        resetGame,
    } from "@stores/game";
    import GameStatus from "./GameStatus.svelte";
    import Dcq from "./Dcq.svelte";

    onDestroy(resetGame);


    const click = (index: number) => {
        return () => clickCard(index);
    };

</script>

<div class="draft-wrapper" data-grid role="presentation" data-open={$modals.game}
    id="modals-game"
    inert={!$modals.game}
    aria-hidden={!$modals.game}>
    <GameStatus />
    <div class="draft">
        {#if $gameStatus.type === "multiple"}
            
        <Image />
        <div class="draft-main" data-focus={$focusData.state}>
            <ul class="card-list">
                {#each $cardsList as card, i (i)}
                    <li class="card-li">
                        <Card
                            text={card.text}
                            on:click={click(i)}
                            chosen={$focusData.cards.includes(i)}
                            disabled={!$gameStatus.gameStarted}
                            badge={gameKeys[i]}
                        />
                    </li>
                {/each}
            </ul>
        </div>
        {:else if $gameStatus.type === "dcq"}
           <Dcq /> 
        {/if}
    </div>
</div>

<style lang="scss">
    .draft {
        display: flex;
        flex-direction: column;
        gap: 1.75rem 1rem;
        padding-block: var(--space-xs) var(--space-l);
        grid-column: full;
        font-family: var(--font-heading);

        @media (min-width: 800px) {
            flex-direction: row;
            grid-column: content;
        }
        &-wrapper {
            overscroll-behavior: contain;
            position: fixed;
            z-index: var(--z-dialog);
            inset: 0;
            background: var(--clr-gray-200);
            display: grid;
            transform: translateX(-100vw);
            place-content: start center;
            pointer-events: none;
            transition: 400ms transform ease-out, 0ms opacity;
            overflow-y: auto;
            &[data-open=true] {
                pointer-events: auto;
                transform: translateX(0vmax);
            }
        }
    }

    .draft-main {
        width: 100%;
        overflow-x: auto;
        padding: 0 0 0.5rem;
        overscroll-behavior-x: contain;
        
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

        @media (min-width: 800px) {
            flex-direction: column;
            padding-inline: 0;
            font-size: var(--step-n1);
        }
    }

    .card-li {
        display: contents;
    }
</style>
