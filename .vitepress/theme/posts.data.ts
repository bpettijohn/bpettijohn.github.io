import { createContentLoader } from "vitepress";

// interface Post {
//   title: string;
//   url: string;
//   date: {
//     time: number;
//     string: string;
//   };
//   excerpt: string | undefined;
// }

// declare const data: Post[];
// export { data };

export default createContentLoader("posts/*.md");
