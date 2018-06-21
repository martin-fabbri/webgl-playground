/* tslint:disable */
/** colortable generation and some utility routines
 * Author: Chris Wolf
 */

import * as d3 from 'd3';

export class ColorTable {
   private static rainbowTable: Uint32Array;       // holds integer representation
   private static rgbRainbowTable: Uint8Array;     // holds individual rgb bytes
   private static rgbaRainbowTable: Uint8Array;     // holds individual rgb bytes
   private static grayScaleTable: Uint8Array;      // rgb grayscale

   static getRainbowTable() {
      if (!this.rainbowTable) {
         this.rainbowTable = this.createRainbowTable();
      }

      return this.rainbowTable;
   }

   static getRgbRainbowTable() {
      if (!this.rgbRainbowTable) {
         let rgbTable: number[] = [];
         let rgbaTable: number[] = [];
         let intTable = this.getRainbowTable();

         intTable.forEach(color => {
            let red = (color & 0xff);
            let green = (color & 0xff00) >> 8;
            let blue = (color & 0xff0000) >> 16;
            rgbTable.push(red);
            rgbTable.push(green);
            rgbTable.push(blue);

            rgbaTable.push(red);
            rgbaTable.push(green);
            rgbaTable.push(blue);
            rgbaTable.push(0xff);
         });

         this.rgbRainbowTable = new Uint8Array(rgbTable);
         this.rgbaRainbowTable = new Uint8Array(rgbaTable);
      }

      return this.rgbRainbowTable;
   }

   static getRgbaRainbowTable() {
      if (!this.rgbaRainbowTable) {
          // @ts-ignore
         let rgbTable: number[] = [];
         let rgbaTable: number[] = [];
         let intTable = this.getRainbowTable();

         intTable.forEach(color => {
            let red = (color & 0xff);
            let green = (color & 0xff00) >> 8;
            let blue = (color & 0xff0000) >> 16;
            rgbaTable.push(red);
            rgbaTable.push(green);
            rgbaTable.push(blue);
            rgbaTable.push(0xff);
         });

         this.rgbaRainbowTable = new Uint8Array(rgbaTable);
      }

      return this.rgbaRainbowTable;
   }

   static getGrayscaleTable() {
      if (!this.grayScaleTable) {
         let grayScaleTable: number[] = [];

         for (let i = 0; i < 256; i++) {
            grayScaleTable.push(i);
            grayScaleTable.push(i);
            grayScaleTable.push(i);
         }

         this.grayScaleTable = new Uint8Array(grayScaleTable);
         this.grayScaleTable.reverse();
      }

      return this.grayScaleTable;
   }

   /** creates the rainbow table */
   private static createRainbowTable(): Uint32Array {

      // We're interested in blue to red, avoid magenta, this means hue going from
      // hue goes from 240 -> -25 degrees because blue to red which is 240 -> 0
      // also the upper end wraps to red magenta, don't include magenta and
      // make table 256 entries
      let MaxDegree = 240;    // blue
      let MinDegree = -15;    // red next to magenta

      let table: number[] = [];

      for (let h = MaxDegree; h >= MinDegree; h--) {
         let hue = h >= 0 ? h : h + 360;
         let rgb = this.hslToRgb(hue, 1.0, 0.5);    // make the color fully saturated and half luminence

         rgb |= 0xff << 24;
         table.push(rgb);
      }

      // put colors into uint32 array
      let intColors = new Uint32Array(table);

      return intColors;
   }

   /**
   * This method creates an equivalent Rgb integer from an Hsl color, 
   * storage from LSB to MSB is: blue, green, red, alpha. Alpha is set to no transparency
   * @param {number} hue - value in degrees from 0 -> 360
   * @param {number} sat - value 0.0 -> 1.0
   * @param {number} lum - value 0.0 -> 1.0
   * @returns the rgb value - red is the MSB, blue is the LSB
   */
   private static hslToRgb(hue: number, sat: number, lum: number) {
      // correct arguments
      if (sat < 0) { sat = 0; }
      else if (sat > 1.0) { sat = 1.0; }
      if (lum < 0) { lum = 0; }
      else if (lum > 1.0) { lum = 1.0; }
      if (hue < 0) { hue += 360.0; }
      else if (hue > 360.0) { hue -= 360.0; }

      let chroma = (1 - Math.abs(2 * lum - 1)) * sat;
      let mod = (hue / 60) % 2.0;
      let x = chroma * (1 - Math.abs(mod - 1));
      let huePrime = hue / 60;
      let red = 0, green = 0, blue = 0;

      if (huePrime >= 0 && huePrime < 1) {
         red = chroma; green = x; blue = 0;
      }
      else if (huePrime >= 1 && huePrime < 2) {
         red = x; green = chroma; blue = 0;
      }
      else if (huePrime >= 2 && huePrime < 3) {
         red = 0; green = chroma; blue = x;
      }
      else if (huePrime >= 3 && huePrime < 4) {
         red = 0; green = x; blue = chroma;
      }
      else if (huePrime >= 4 && huePrime < 5) {
         red = x; green = 0; blue = chroma;
      }
      else if (huePrime >= 5 && huePrime < 6) {
         red = chroma; green = 0; blue = x;
      }

      // convert to rgb values 0-255
      let m = lum - chroma / 2.0;

      let ired = Math.floor((red + m) * 255.0);
      let igreen = Math.floor((green + m) * 255.0);
      let iblue = Math.floor((blue + m) * 255.0);

      // alpha set to no transparency, HTML canvas has rgba order with red in lsb
      let rgba = ired | igreen << 8 | iblue << 16 | 0xff000000;

      return rgba;
   }

   ///////////////////////////////////// New d3 table types /////////////////////////////
   static getViridisTable() {
      return this.buildColorTable(d3.interpolateViridis, true);
   }

   static getRainbowTable2() {
      return this.buildColorTable(d3.interpolateRainbow, true);
   }

   static getPlasmaTable() {
      return this.buildColorTable(d3.interpolatePlasma, true);
   }

   static getCoolTable() {
      return this.buildColorTable(d3.interpolateCool, true);
   }

   static getWarmTable() {
      return this.buildColorTable(d3.interpolateWarm, true);
   }

   static getGnBuTable() {
      return this.buildColorTable(d3.interpolateGnBu);
   }

   static getBluesTable() {
      return this.buildColorTable(d3.interpolateBlues);
   }
   static getPuBuTable() {
      return this.buildColorTable(d3.interpolatePuBu);
   }

   static getOrangesTable() {
      return this.buildColorTable(d3.interpolateOranges);
   }
   static getGreensTable() {
      return this.buildColorTable(d3.interpolateGreens);
   }

   static getYlOrRdTable() {
      return this.buildColorTable(d3.interpolateYlOrRd);
   }

   static getYlOrBrTable() {
      return this.buildColorTable(d3.interpolateYlOrBr);
   }

   /** gets all of the color tables and returns a Uint8Array containing all of them along with 
    * how many tables, and the length of the tables
    */
   static getAllColorTables() {
      // all tables are 256 in length
      let colorTables = [
         ColorTable.getRgbRainbowTable(),
         ColorTable.getRainbowTable2(),
         ColorTable.getViridisTable(),
         ColorTable.getPlasmaTable(),
         ColorTable.getWarmTable(),
         ColorTable.getCoolTable(),
         ColorTable.getGnBuTable(),
         ColorTable.getBluesTable(),
         ColorTable.getPuBuTable(),
         ColorTable.getOrangesTable(),
         ColorTable.getGreensTable(),
         ColorTable.getYlOrRdTable(),
         ColorTable.getYlOrBrTable(),
         ColorTable.getGrayscaleTable(),
      ];

      let table: number[] = [];
      colorTables.forEach(t => {
         for (let i = 0; i < t.length; i++) {
            table.push(t[i]);
         }
      });

      return { numberTables: colorTables.length, tableLength: colorTables[0].length, colorTables: new Uint8Array(table) };
   }

   private static buildColorTable(func: (val: number) => string, reverseTable: boolean = false) {
      const TABLELEN = 256;
      let colorScale = d3.scaleSequential(func)
         .domain([0, TABLELEN]);

      let table: number[] = [];
      let cssTable: string[] = [];

      // two pass since the colors go from bright to dark
      for (let i = 0; i < TABLELEN; i++) {
         let cssColor = colorScale(i);
         cssTable.push(cssColor);
      }

      // reverse the table
      if (reverseTable) {
         cssTable.reverse();
      }

      for (let i = 0; i < TABLELEN; i++) {
         let channels = this.getHexColor(cssTable[i]);
         table.push(channels.r);
         table.push(channels.g);
         table.push(channels.b);
      }

      // now create a uint8 array
      return new Uint8Array(table);
   }

   static getHexColor(s: string): { r: number, g: number, b: number } {
      let index = s.indexOf("#");
      if (index > -1) {
         let r = parseInt(s.substr(1, 2), 16);
         let g = parseInt(s.substr(3, 2), 16);
         let b = parseInt(s.substr(5, 2), 16);
         return { r, g, b };
      }

      // turn the form rgb(r,g,b) to #xxxxxx
      s = s.replace("rgb", "");
      s = s.replace("(", "");
      let tokens = s.split(",");

       // @ts-ignore
      let a = [];
      tokens.forEach(t => {
          // @ts-ignore
         a.push(parseInt(t));
      });

       // @ts-ignore
      return { r: a[0], g: a[1], b: a[2] };
   }

   ///////////////////////////////////// New d3 table types /////////////////////////////
   static rgbPalettes: Uint8Array[];
   static cssPalettes: string[][];

   static getRgbPalettes(): Uint8Array[] {
      if (!this.rgbPalettes) {
         let palettes: Uint8Array[] = [];
         palettes.push(this.getRgbRainbowTable());
         palettes.push(this.getRainbowTable2());
         palettes.push(this.getViridisTable());
         palettes.push(this.getPlasmaTable());
         palettes.push(this.getWarmTable());
         palettes.push(this.getCoolTable());
         palettes.push(this.getGnBuTable());
         palettes.push(this.getBluesTable());
         palettes.push(this.getPuBuTable());
         palettes.push(this.getOrangesTable());
         palettes.push(this.getGreensTable());
         palettes.push(this.getYlOrBrTable());
         palettes.push(this.getYlOrRdTable());
         palettes.push(this.getGrayscaleTable());

         this.rgbPalettes = palettes;
      }


      return this.rgbPalettes;
   }

   static pad(s: string) {
      return s.length < 2 ? ("0" + s) : s;
   }

   static getCssPalettes(): string[][] {
      if (!this.cssPalettes) {
         this.cssPalettes = [];

         // go thru each palette and add an alpha channel
         this.getRgbPalettes().forEach(palette => {
            let cssPalette: string[] = [];
            for (let i = 0; i < palette.length; i += 3) {
               let color = `#${this.pad(palette[i].toString(16))}${this.pad(palette[i + 1].toString(16))}${this.pad(palette[i + 2].toString(16))}`;
               cssPalette.push(color);
            }

            this.cssPalettes.push(cssPalette);
         });

      }

      return this.cssPalettes;
   }

}
/* tslint:enable */