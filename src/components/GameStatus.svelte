<script lang="ts">
    import { gameStatus } from "@/stores/game";
    import { MODE } from "@/stores/modes";
</script>

<div class="game-status">
    {#if $MODE.name === "classic"}
        <span class="game-status-lives">
            <svg viewBox="0 0 24 24">
                <use href="#heart"></use>
            </svg>
            <strong>{$gameStatus.lives}</strong>
        </span>
    {/if}
</div>

<style lang="scss">
    .game-status {
        margin-top: var(--space-s);
        padding: var(--space-xs) var(--space-m);
        background: var(--clr-white);
        box-shadow: 0 1px 5px -4px hsl(var(--shadow-color) 20% / 80%);
        border-radius: 0.5rem;

        &-lives {
            display: flex;
            gap: var(--space-3xs);
            place-items: center;
            color: var(--clr-gray-800);

            strong {
                font-size: var(--step-2);
            }
        }
    }
</style>
