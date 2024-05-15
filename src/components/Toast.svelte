<script lang="ts">
    import { toast } from "@stores/toast";
</script>

<div role="alertdialog" aria-hidden={$toast <= ""}>{$toast}</div>

<style lang="scss">
div {
    --offset: var(--space-m);

    max-width: min(500px, calc(100vw - (2 * var(--space-m))));
    padding: 0.5rem 0.75rem 0.6rem;
    background: var(--clr-white);
    border-radius: 0.4rem;
    box-shadow: 
        0 1px 5px -4px hsl(var(--shadow-color) 20% / 80%),
        0 0 0px 2px hsl(var(--shadow-color) 40% / 20%);
        
    color: var(--clr-gray-800);
    font-size: var(--step-0);
    position: fixed;
    inset: auto var(--offset) var(--offset) auto;
    transform-origin: bottom right;
    transition: transform 50ms ease-out;
    z-index: var(--z-toast);


    &[aria-hidden="true"] {
        transform: scale(0);
    }
}
</style>
