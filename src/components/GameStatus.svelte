<script lang="ts">
    import { gameStatus, percent, stringTime, currentStatus } from "@/stores/game";
    import { MODE } from "@/stores/modes";
</script>

<div class="game-status" >
    <button class="game-status-close" title="Close Game">
        <svg viewBox="0 0 24 24">
            <use href="#close"></use>
        </svg>
    </button>

    {#if $MODE.name === "classic"}
        <span class="game-status-lives">
            <svg viewBox="0 0 24 24">
                <use href="#heart"></use>
            </svg>
            <strong>{$gameStatus.lives}</strong>
        </span>
    {:else if $MODE.name === "survival"}
        <span class="game-status-lives">
            <svg viewBox="0 0 24 24">
                <use href="#timer"></use>
            </svg>
            <strong>{$stringTime}</strong>
        </span>
    {/if}
</div>

<div
    data-status={$currentStatus}
    role="progressbar"
    data-value={$percent}
    style={`--percent: ${$percent / 100}`}
    aria-valuemax="100"
    aria-valuemin="0"
    aria-valuenow={$percent}
    title={`${$percent}% of cards matched!`}
></div>

<style lang="scss">
    .game-status {
        display: flex;
        gap: 2rem;
        align-items: center;
        justify-content: space-between;
        margin-top: var(--space-2xs);
        padding: var(--space-xs) var(--space-s);
        background: var(--clr-white);
        box-shadow: 0 1px 5px -4px hsl(var(--shadow-color) 20% / 20%);
        border-radius: 0.5rem;
        grid-column: full;
        margin-inline: var(--space-2xs);
        color: var(--clr-gray-800);

        @media (min-width: 768px) {
            grid-column: content;
            margin-inline: 0;
        }

        &-close {
            --icon-size: 40px;
            display: flex;
            place-content: center;
            background: none;
            border: none;
        }

        &-lives {
            --c-lives-drop-shadow: var(--lives-drop-shadow, 0 0 2px green);
            --icon-size: 25px;
            display: flex;
            gap: var(--space-3xs);
            place-items: center;

            strong {
                font-size: var(--step-1);
                font-weight: 600;
            }

        }
    }

    [role="progressbar"] {
        --percent: 0;
        --radius: 0.5rem;
        --offset: var(--space-3xs);
        --clr: hsl(var(--shadow-color) 20% / 80%);


        &[data-status="success"] {
            --clr: hsl(140deg 65% 49% / 80%);
        }

        &[data-status="failure"] {
            --clr: hsl(0deg 74% 50% / 80%);
        }

        width: min(500px, 100%);
        margin: var(--space-s) auto var(--space-2xs);
        background: var(--clr-white);
        height: 25px;
        position: relative;
        isolation: isolate;
        border-radius: var(--radius);
        box-shadow: 0 1px 5px -4px hsl(var(--shadow-color) 40% / 70%);

        &:before {
            content: "";
            position: absolute;
            border-radius: var(--radius);
            inset: var(--offset)
                calc(((1 - var(--percent)) * 100%) + var(--offset))
                var(--offset) var(--offset);
            background: var(--clr);
            transition: 200ms ease-out;
        }
    }
</style>
