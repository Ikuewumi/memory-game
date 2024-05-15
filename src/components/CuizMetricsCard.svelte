<script lang="ts">
    export let icon = "#numbers";
    export let title = "Performance";
    export let content = "95%";
</script>

<div class="cuiz-metrics-card">
    <svg class="cuiz-metrics-card-decoration" viewBox="0 0 24 24"
        ><use href={icon}></use></svg
    >
    <h3 class="cuiz-metrics-card-title">{title}</h3>

    <strong class="cuiz-metrics-card-content">{content}</strong>
</div>

<style lang="scss">
    .cuiz-metrics-card {
        display: grid;
        gap: 0.25rem;
        align-content: start;
        place-content: center;
        text-align: center;
        padding: 1.5rem 0.75rem 1.75rem;
        //background: var(--clr-gray-400);
            background: var(--clr-white);
        //aspect-ratio: 4 / 3;
        border-radius: 0.5rem;
        border: 1px solid hsl(var(--shadow-color) 70% / 50%);
        position: relative;
        isolation: isolate;
        transition: 200ms ease-in-out;
        cursor: pointer;

        &:hover {
            box-shadow: 0 1px 0 6px hsl(var(--shadow-color-dark) / 10%);
        }

        &-decoration {
            --icon-size: 50px;
            position: absolute;
            inset: auto 0.2rem 0.2rem auto;
            pointer-events: none;
            z-index: -1;
            opacity: 0.15;
            color: var(--clr-gray-700);
        }

        &-title {
            font-family: var(--font-heading);
            font-weight: 600;
            font-size: var(--step-n1);
            text-transform: uppercase;
            text-align: center;
        }

        &-content {
            font-size: var(--step-5);
            font-weight: 700;
            font-family: var(--font-heading);
            line-height: 0.9;
            text-align: center;
        }
    }
</style>
