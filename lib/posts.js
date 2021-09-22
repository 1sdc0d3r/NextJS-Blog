import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");
console.log({ postsDirectory });

export function getSortedPostsData() {
  // get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  console.log({ fileNames });
  const allPostsData = fileNames.map((fileName) => {
    // remove '.md' from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // read md file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // use ray-matter to parse post metadata
    const matterResult = matter(fileContents);

    console.log({ id, fullPath, fileContents, matterResult });
    // combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    else return 0;
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  /* Returns an array that looks like this:
  [{params: {
        id: 'ssg-ssr'
      }
    },
    {
    params: {
     id: 'pre-rendering'
    }}] */
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
  };
}
