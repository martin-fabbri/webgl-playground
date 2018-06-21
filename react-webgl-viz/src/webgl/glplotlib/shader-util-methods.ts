/*
 * this class contains the shader utility methods such as lookup for various routines
 * 
 * Author: Chris Wolf
 */
export class ShaderUtilMethods {
   public static methods = `

   /*
   * this is a simple lookup that returns the nearest index where the value
   * is less than or equal to the value being searched. If the value is outside
   * the table then either 0 or the max index is returned. 
   * @param val the value to be looked up
   * @param tableId the id of the webgl sample texture containing float values
   * @param tableLength length of the table
   */
   int lookup(float val, sampler2D tableId, int tableLength) {
      int midIndex = 0;
      int lowIndex = 0;
      int highIndex = tableLength - 1;

      vec4 texelVal; // vector that holds the value, it's in the r channel
      while (lowIndex <= highIndex) {
         midIndex = ((lowIndex + highIndex) / 2);

         // fetch the exact value from the lookup table
         texelVal = texelFetch(tableId, ivec2(midIndex, 0), 0);

         if (texelVal.r > val) {
            highIndex = midIndex - 1;
         }
         else if (texelVal.r < val) {
            lowIndex = midIndex + 1;
         }
         else {
            return midIndex;
         }
      }

      if (highIndex < 0) highIndex = 0;

      return highIndex;
   }
`;

}