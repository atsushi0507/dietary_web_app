"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/atoms/Button";
import BasicAlert from "@/components/atoms/Alert";
import CheckBox from "@/components/atoms/CheckBox";
import Link from "@/components/atoms/Link";
import { useState } from "react";
import Calendar from "@/components/atoms/Calendar";
import ProgressBar from "@/components/atoms/ProgressBar";
import BasicTab from "@/components/atoms/Tab";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [val, setVal] = useState(0);

  const handleTabChange = (e, newValue) => {
    console.log(newValue);
    setVal(newValue);
  }

  const handleCheckBoxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleIncrement = () => {
    setProgress((prev) => Math.min(prev + 10, 100));
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button>
          test
        </Button>
        <BasicAlert severity="success" message="Success!" />
        <BasicAlert severity="info" message="Info" />
        <BasicAlert severity="warning" message="Warning" />
        <BasicAlert severity="error" message="Error" />

        <CheckBox 
          label="I agree to the terms and conditions of Zoomin"
          checked={isChecked}
          onChange={handleCheckBoxChange}
          name="terms"
        />

        <BasicTab items={["食事", "体重"]} value={val} onChange={handleTabChange}/>

        <div>
          <h1>Progress Bar Example</h1>
          <ProgressBar value={progress} maxValue={100} isPercent={true} key="id1"/>
          <button onClick={handleIncrement}>Increase Progress</button>
        </div>
        <div>
          <h1>Progress Bar Example 2</h1>
          <ProgressBar value={2} maxValue={6} isPercent={false} key="id2"/>
          <button onClick={handleIncrement}>Increase Progress</button>
        </div>

        <Calendar />


        <Image
          className={styles.logo}
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.js</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
