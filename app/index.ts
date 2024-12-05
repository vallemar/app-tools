import { GestureRootView } from '@nativescript-community/gesturehandler';
import { Frame, type NavigatedData, Page } from '@nativescript/core';

export function init() {
    if (!PRODUCTION && DEV_LOG) {
        Page.on('navigatingTo', (event: NavigatedData) => {
            DEV_LOG && console.info('NAVIGATION', 'to', event.object, event.isBackNavigation);
        });
        Page.on('showingModally', (event: NavigatedData) => {
            DEV_LOG && console.info('NAVIGATION', 'MODAL', event.object, event.isBackNavigation);
        });
        Frame.on('showingModally', (event: NavigatedData) => {
            DEV_LOG && console.info('NAVIGATION', 'MODAL', event.object, event.isBackNavigation);
        });
        Frame.on('closingModally', (event: NavigatedData) => {
            DEV_LOG && console.info('NAVIGATION', 'CLOSING MODAL', event.object, event.isBackNavigation);
        });
        Page.on('closingModally', (event: NavigatedData) => {
            DEV_LOG && console.info('NAVIGATION', 'CLOSING MODAL', event.object, event.isBackNavigation);
        });
        GestureRootView.on('shownInBottomSheet', (event: NavigatedData) => {
            DEV_LOG && console.info('NAVIGATION', 'BOTTOMSHEET', event.object, event.isBackNavigation);
        });
        GestureRootView.on('closedBottomSheet', (event: NavigatedData) => {
            DEV_LOG && console.info('NAVIGATION', 'CLOSING BOTTOMSHEET', event.object, event.isBackNavigation);
        });
    }
}
