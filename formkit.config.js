import { generateClasses } from "@formkit/themes";

const config = {
  config: {
    classes: generateClasses({
      global: {
        label: "block mb-1 font-bold text-lg mb-2",
        message: "text-red-500 ",
        wrapper: "space-y-2 m-5",
        input:
          "w-full p-3 border border-gray-300  rounded  text-gray-700 placeholder-gray-400",
      },
      file: {
        noFiles: "block my-2 ",
        fileItem: "hidden",
      },

      submit: {
        input: "$reset bg-green-400 hover:bg-green-500 w-full p-2 font-bold uppercase text-white disabled:opacity-50",
      },
    }),
  },
};
export default config;
