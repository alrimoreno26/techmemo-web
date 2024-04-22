
export type MenuMode =
    'static'
    | 'overlay'
    | 'horizontal'
    | 'slim'
    | 'compact'
    | 'reveal'
    | 'drawer'
    | 'STATIC'
    | 'OVERLAY'
    | 'HORIZONTAL'
    | 'SLIM'
    | 'COMPACT'
    | 'REVEAL'
    | 'DRAWER';

export type ColorScheme = 'light' | 'dark' | 'dim' | 'LIGHT' | 'DARK' | 'DIM';

export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    theme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
    menuTheme: string;
}

export interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    rightMenuVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
    searchBarActive: boolean;
    sidebarActive: boolean;
    anchored: boolean;
}
