import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

const IndexPage: NextPage = () => {
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImage1().then((newImage) => {
      setImageUrl1(newImage.url);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchImage2().then((newImage) => {
      setImageUrl2(newImage.url);
    });
    setLoading(false);
  }, []);

  // ボタンをクリックしたときに画像を読み込む処理
  const handleClick1 = async () => {
    setLoading(true); // 読込中フラグを立てる
    const newImage = await fetchImage1();
    setImageUrl1(newImage.url); // 画像URLの状態を更新する
    setLoading(false); // 読込中フラグを倒す
  };

  const handleClick2 = async () => {
    setLoading(true); // 読込中フラグを立てる
    const newImage = await fetchImage2();
    setImageUrl2(newImage.url); // 画像URLの状態を更新する
    setLoading(false); // 読込中フラグを倒す
  };

  return (
    // <div>
    // <button onClick={handleClick}>他のにゃんこも見る</button>
    <div className={styles.page}>
      <button onClick={handleClick1} className={styles.button}>
        他のにゃんこも見る
      </button>
      <div className={styles.frame}>
        {loading || <img src={imageUrl1} className={styles.img} />}
      </div>
      <div className={styles.page}>
        <button onClick={handleClick2} className={styles.button}>
          他のわんこも見る
        </button>
        <div className={styles.frame}>
          {loading || <img src={imageUrl2} className={styles.img} />}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
type Image = {
  url: string;
};
const fetchImage1 = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
const fetchImage2 = async (): Promise<Image> => {
  const res = await fetch("https://api.thedogapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
