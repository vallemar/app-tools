type Color = import('@nativescript/core').Color;

declare module 'svelte/internal' {
    export function get_current_component();
}
type MultiPlatform<T> = T & {
    [K in keyof T as `ios:${K}`]: T[K];
} & {
    [K in keyof T as `android:${K}`]: T[K];
};

declare namespace svelteNative.JSX {
    type Override<What, With> = Omit<What, keyof With> & With;

    type IntrinsicElementsAugmented = Override<
        TIntrinsicElements,
        {
            mdbutton: ButtonAttributes;
        } & {
            [K in keyof TIntrinsicElements]: MultiPlatform<TIntrinsicElements[K]>;
        }
    >;
    interface ViewAttributes {
        defaultVisualState?: string;
        'prop:mainContent'?;
        'prop:leftDrawer'?;
        'prop:rightDrawer'?;
        'prop:bottomDrawer'?;
        'prop:topDrawer'?;
        disableCss?: boolean;
        rippleColor?: string | Color;
        sharedTransitionTag?: string;
        verticalAlignment?: string;
        dynamicElevationOffset?: string | number;
        elevation?: string | number;
        'on:closingModally'?: (args: ShownModallyData) => void;
        // "on:shownModally"?: (args: ShownModallyData) => void;
    }

    interface ButtonAttributes {
        variant?: string;
        shape?: string;
    }

    interface ImageAttributes {
        noCache?: boolean;
        placeholderImageUri?: string;
        failureImageUri?: string;
        imageRotation?: number;
        colorMatrix?: number[];
        blurRadius?: number;
        fadeDuration?: number;
        contextOptions?: any;
        'on:rotateAnimated'?: (args: EventData) => void;
    }
    interface LabelAttributes {
        linkColor?: string;
        autoFontSize?: boolean;
        maxLines?: number;
        minFontSize?: number;
        maxFontSize?: number;
        lineBreak?: string;
        html?: string;
        selectable?: boolean;
        'ios:selectable'?: boolean;
        onlinkTap?;
        'on:linkTap'?;
    }
    interface TextFieldAttributes {
        floating?: boolean | string;
        variant?: string;
        placeholder?: string;
        placeholderColor?: string | Color;
        'on:returnPress'?: (args) => void;
    }
    interface TextBaseAttributes {
        verticalTextAlignment?: string;
        text?: string | number;
    }
    interface SpanAttributes {
        verticalAlignment?: string;
        verticalTextAlignment?: string;
    }
    interface ProgressAttributes {
        busy?: boolean;
        indeterminate?: boolean;
    }
    interface SliderAttributes {
        stepSize?: number;
        trackBackgroundColor?: string | Color;
    }
    interface ProgressAttributes {
        padding?: number | string;
    }
    interface PageAttributes {
        'on:sharedElementTo'?: (args) => void;
        'on:sharedElementFrom'?: (args) => void;
        navigationBarColor?: string | Color;
        statusBarColor?: string | Color;
        screenOrientation?: string;
        keepScreenAwake?: boolean;
        screenBrightness?: number;
    }

    type IntrinsicElementsAugmentedLowercase = {
        [K in keyof IntrinsicElementsAugmented as Lowercase<K>]: MultiPlatform<IntrinsicElementsAugmented[K]>;
    };
    interface IntrinsicElements extends IntrinsicElementsAugmented, IntrinsicElementsAugmentedLowercase {}
}
