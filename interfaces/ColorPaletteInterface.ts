export default interface ColorPalette{
    paletteName: string,
    id: string,
    colors: color[],
}

export interface color{
    name: string,
    color:string
}

export interface colorFormat{
    name: string,
    id:string,
    hex:string,
    rgb:string,
    rgba:string,
}

export interface ColorPaletteShades{
    paletteName: string,
    id: string,
    colors:{
        [key:number]:Array<colorFormat>,
    }
}