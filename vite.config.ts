import solid from "solid-start/vite";
import vercel from "solid-start-vercel";
// import netlify from "solid-start-netlify";
import { defineConfig } from "vite";

// export default defineConfig({
//   // plugins: [solid()],
//   plugins: [{
//   //   ...(await import('@mdx-js/rollup')).default({
//   //     jsx: true,
//   //     jsxImportSource: "solid-js",
//   //     providerImportSource: "solid-mdx"
//   //   }),
//   //   enforce: "pre"
//   // }),
//   solid({
//     // extensions: ['.md','.mdx']
//     adapter:vercel()
//   })
// });

export default defineConfig({
  plugins: [
    solid({
      // adapter: netlify({edge:true})
      adapter: vercel({ edge: true }),
    }),
  ],
});

// let options = {};
// if (import.meta.env.PROD) {
//   options = {
//     adapter: vercel({ edge: true }),
//   };
// }

// export default defineConfig({
//   plugins: [solid(options)],
// });
// export default defineConfig({
//   plugins: [solid()],
// });
