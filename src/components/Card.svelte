<script lang="ts">
    export let text = "Default Text";
    export let chosen = false;
    export let badge = "1";
    export let disabled = true;
</script>

<!-- svelte-ignore a11y-role-supports-aria-props -->
<button {disabled} aria-selected={chosen} class="card" on:click>
    {text}
    <span class="card-badge" >{badge}</span>
</button>

<style lang="scss">
    .card {
        position: relative;
        padding: 0.5rem;
        display: grid;
        place-content: center;
        line-height: 1.2;
        //height: fit-content;
        text-align: center;
        background: var(--clr-white);
        color: var(--clr-gray-900);
        border-radius: var(--space-3xs);
        border: 1px solid hsl(var(--shadow-color-dark) / 20%);
        box-shadow: 0 0.5px 5px -4px hsl(var(--shadow-color-dark) / 80%);
        padding: 1rem 0.25rem 1.1rem;
        font-size: var(--step-card);
        font-weight: 500;
        cursor: pointer;
        transition:
            background 50ms ease-in,
            color 100ms ease-in-out;


        &[aria-selected="true"] {
            background: var(--bg);
            color: var(--clr);
            transition-delay: var(--delay, 0ms);
        }

        &:focus {
            outline-width: 0;
            outline-color: hsl(var(--shadow-color) 45%);
            outline-offset: -7px;

            &[aria-selected="true"] {
                outline-width: 2px;
            }
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.4;
        }

        &-badge {
            position: absolute;
            inset: var(--space-3xs) var(--space-3xs) auto auto;
            padding: var(--space-3xs);
            border-radius: var(--space-3xs);
            box-shadow: 0 1px 0px 2px hsl(var(--shadow-color) 60% / 20%);
            padding: 0.15rem 0.25rem;
            aspect-ratio: 1;
            font-size: var(--step-n2);
            z-index: var(--z-home);
            display: none;
            pointer-events: none;

            @media (min-width: 768px) {
            //display: block;
            }
        }
    }
</style>
