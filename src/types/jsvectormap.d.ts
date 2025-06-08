declare module 'jsvectormap' {
    interface JsVectorMapOptions {
        selector: string;
        map: string;
        zoomButtons?: boolean;
        regionStyle?: {
            initial?: {
                fill?: string;
                fillOpacity?: number;
                stroke?: string;
                strokeWidth?: number;
            };
            hover?: {
                fill?: string;
                fillOpacity?: number;
                cursor?: string;
            };
        };
        regionLabelStyle?: {
            initial?: {
                fontFamily?: string;
                fontWeight?: string;
                fill?: string;
            };
            hover?: {
                cursor?: string;
            };
        };
        labels?: {
            regions?: {
                render?: (code: string) => string;
            };
        };
    }

    class JsVectorMap {
        constructor(options: JsVectorMapOptions);
        static addMap(name: string, options: any): void;
    }

    export default JsVectorMap;
} 