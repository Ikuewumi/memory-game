<script lang="ts">
    import { modals, resetModals } from "@stores/modals";
    import { modes, BLITZ_SECONDS } from "@stores/modes"
    import { createEventDispatcher } from "svelte";


    let modeIndex: number = 0;
    let timeIndex: number = 0;


    const evt = createEventDispatcher()

    const emitPlay = () => {
        evt("start-game", {
            modeIndex,
            timeIndex
        })
    }



</script>

<div
    class="cuiz-options-wrapper"
    role="presentation"
    data-open={$modals.options}
    inert={!$modals.options}
    aria-hidden={!$modals.options}
    on:click|self={resetModals}
>
    <div class="cuiz-options-modal">
        <h2 class="cuiz-options-heading text-gradient">Cuiz Options</h2>

        <form class="cuiz-options-form" on:submit|preventDefault>
            <div class="cuiz-options-field">
                <label for="" class="cuiz-options-label">
                    <svg class="cuiz-options-label-svg" viewBox="0 0 24 24">
                        <title>Mode</title>
                        <use href="#options"></use>
                    </svg>
                </label>
                <div class="cuiz-options-select-wrapper" role="presentation">
                    <select bind:value={modeIndex} name="" class="cuiz-options-select">
                        {#each modes as mode, i (i)}
                            <option value={i}>{mode.name}</option>
                        {/each} 
                    </select>

                    <svg
                        class="cuiz-options-select-arrow"
                        role="presentation"
                        viewBox="0 0 24 24"><use href="#down-arrow"></use></svg
                    >
                </div>
            </div>

            {#if modes[modeIndex].name === "blitz"}
                
            <div class="cuiz-options-field">
                <label for="" class="cuiz-options-label">
                    <svg class="cuiz-options-label-svg" viewBox="0 0 24 24">
                        <title>Time</title>
                        <use href="#timer"></use>
                    </svg>
                </label>
                <div class="cuiz-options-select-wrapper" role="presentation">
                    <select name="" class="cuiz-options-select" bind:value={timeIndex}>
                        {#each BLITZ_SECONDS as timeInSeconds, i (i) }
                                <option value={i}>{ timeInSeconds / 60 } { timeInSeconds / 60 > 1 ? `mins` : `min` }</option> 
                        {/each}     
                    </select>

                    <svg
                        class="cuiz-options-select-arrow"
                        role="presentation"
                        viewBox="0 0 24 24"><use href="#down-arrow"></use></svg
                    >
                </div>
            </div>

            {/if}
            <blockquote class="cuiz-options-blockquote">
                <h3 class="cuiz-options-blockquote-heading">How To Play</h3>
                <p class="cuiz-options-blockquote-description">
                    {modes[modeIndex].description}
                </p>
            </blockquote>

            <div class="cuiz-options-buttons">
                <button class="cuiz-options-button" title="Play" on:click={emitPlay}>Play</button
                ><button class="cuiz-options-button" title="Close" on:click={resetModals}>Close</button
                >
            </div>
        </form>
    </div>
</div>

<style lang="scss">
    .cuiz-options {
        &-wrapper {
            position: fixed;
            z-index: var(--z-dialog);
            inset: 0;
            background: hsl(var(--shadow-color) 10% / 70%);
            display: grid;
            transform: translateX(100vw);
            transform-origin: top right;
            place-content: start center;
            padding-top: var(--step-2);
            backdrop-filter: blur(6px);
            overflow-y: auto;
            pointer-events: hidden;
            transition: 400ms transform ease-out;

            &[data-open=true] {
                pointer-events: auto;
                transform: translateX(0vmax);
            }
        }

        &-modal {
            display: grid;
            gap: var(--space-2xs);
            overflow: hidden auto;
            background: var(--clr-white);
            border-radius: 0.5rem;
            color: var(--clr-black);
            width: min(500px, calc(100vw - 3rem));
            padding: 0.5rem 1.25rem 2rem;
            box-shadow: 0 1px 0px 3px hsl(var(--shadow-color-dark) / 20%);
        }

        &-heading {
            font-size: var(--step-4);
            font-weight: 700;
        }

        &-form {
            display: grid;
            gap: 0.75rem;
            margin-top: 0.35rem;
        }

        &-field {
            display: flex;
            gap: var(--space-2xs);
            align-items: center;
            font-size: var(--step-1);
        }

        &-select {
            padding: 0.25rem 2rem 0.4rem 0.5rem;
            border: 3px solid hsl(var(--shadow-color) 70% / 60%);
            border-radius: 0.5rem;
            background: var(--clr-white);
            color: var(--clr-black);
            appearance: none;
            text-transform: lowercase;

            &:focus-visible {
                outline: 2px solid;
                outline-offset: -4px;
            }
        }

        &-select-wrapper {
            position: relative;
        }

        &-select-arrow {
            --icon-size: calc(1.2 * var(--step-1));
            position: absolute;
            pointer-events: none;
            inset: 50% 0.2rem auto auto;
            transform: translate(0, -50%);
        }

        &-label-svg {
            --icon-size: calc(1.5 * var(--step-1));
            opacity: 0.7;
        }

        &-blockquote {
            display: grid;
            gap: 0.15rem;
            border-left: 2px solid var(--clr-gray-900);
            border-radius:  2px 0.3rem 0.3rem 2px;
            padding: 0.5rem 1rem 1.2rem;
            margin-top: 0.5rem;
            background: hsl(var(--shadow-color-dark) / 10%);
            line-height: 1.5;
            font-size: var(--step-n0);
        }

        &-blockquote-heading {
            font-weight: 600;
            text-transform: capitalize;
            //margin-top: calc( -0.3rem + (-0.5 * var(--step-n0)));
            margin-left: calc(-1 * 0.4rem);
            background: var(--clr-white);
            justify-self: start;
            border-radius: 2rem;
            padding: 0.3rem 0.5rem 0.325rem;
                box-shadow: inset 0 0 0 2px hsl(var(--shadow-color) 80%/ 20%);
            line-height: 0.9;
        }

        &-buttons {
            display: flex;
            gap: 0.75rem;
            align-items: center;
            margin-left: auto;
            margin-top: 0.5rem;
        }

        &-button {
            border: 0;
            border-radius: 0.5rem;
            background: var(--clr-black);
            color: var(--clr-white);
            padding: 0.7rem 1.5rem 0.75rem;
            font-weight: 600;
            //font-family: var(--font-heading);
            font-size: var(--step-1);
            text-transform: uppercase;
            cursor: pointer;

            &:focus-visible {
                outline-offset: -7px;
                outline: 2px solid currentColor;
            }
            &[title="Play"] {
                order: 2;
                position: relative;

                background: var(--clr-black);

                box-shadow: inset 0 0 0 3px hsl(var(--shadow-color) 80%/ 50%);
            }

            &[title="Close"] {
                background: transparent;
                color: var(--clr-black);
                box-shadow: inset 0 0 0 3px hsl(var(--shadow-color) 70%/60%);
            }
        }
    }
</style>
