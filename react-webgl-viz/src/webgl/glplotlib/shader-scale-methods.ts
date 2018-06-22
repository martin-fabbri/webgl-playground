/* tslint:disable */
/**
 * This class contains shader methods for scaling vertices. It is used in
 * all plot shaders to help convert linear coordinates to log/biexp/glog
 * TODO: change the lambda to be a uniform, also biexp table size may change or may uniform
 *
 * Author: Chris Wolf
 */
export class ShaderScaleMethods {
    public static fields = `
      const float LN10 = log(10.0);
      const float alpha = 0.0;
      const float lambda = 128000.0;
      const float BIEXP_TABLE_SIZE = 1024.0;
      const float BIEXP_MAX = 4.5;
      uniform sampler2D u_lookupId;    // set to lookup biexp table texture
   `;

    public static methods = `
  
   // *******************************************************
   // returns the biexponential value given the linear value, using
   // a binary search alg. on the lookup table
   // val: the table value to lookup
   // channel: either xyz ( 0, 1, 2 )
   // returns: the biexponential value ranging from 0 to 4.5
   // *******************************************************
   float biexp(float val, int channel) {
      int len = int(BIEXP_TABLE_SIZE);
      int midIndex;
      int lowIndex = 0;
      int highIndex = len - 1;
   
      vec4 texelVal;
      while (lowIndex <= highIndex) {
         midIndex = int(((lowIndex + highIndex) / 2));

         // fetch the exact value from the lookup table
         texelVal = texelFetch(u_lookupId, ivec2(midIndex, channel), 0);
         
         if (texelVal.r > val) {
            highIndex = midIndex - 1;
         }
         else if (texelVal.r < val) {
            lowIndex = midIndex + 1;
         }
         else {
            return (BIEXP_MAX / BIEXP_TABLE_SIZE) * float(midIndex);
         }
   
      }
   
      if (highIndex < 0) highIndex = 0;
   
      return (BIEXP_MAX / BIEXP_TABLE_SIZE ) * float(highIndex);
   }

   float glog(float linearVal) {
      float val = log((linearVal - alpha) + sqrt((linearVal - alpha) * (linearVal - alpha)  + lambda));
      return val;
   }

   float logClamp(float linearVal){
      if (linearVal < 1.0) linearVal = 1.0;
      float val = log(linearVal)/LN10;
      return val;
   }

   float getValue(float linearVal, int scale, int channel) {
      float result = linearVal;

      switch (scale) {
         case 0:              // linear
         result = linearVal;
         break;
         case 1:              // clamped log
         result = logClamp(linearVal);
         break;
         case 2:              // biexponential
         result = biexp(linearVal, channel);
         break;
         case 3:              // glog
         result = glog(linearVal);
         break;
      }

      return result;
   }
   `;
}
/* tslint:enable */
