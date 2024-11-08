import AppButton from "@/components/button/Button";
import { ButtonVariant } from "@/lib/types";
import { MouseEventHandler } from "react";

type TextType = "check" | "wrong" | "correct";

type ContinueButtonProps = {
  answer?: string;
  type: TextType;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function FooterButton({
  answer,
  type,
  onClick,
}: ContinueButtonProps) {
  const buttonText = type === "check" ? "Check answer" : "Continue";

  let bgColor = "bg-pink-200";

  let answerValidity = type === "wrong" ? "Wrong answer" : "Correct answer";
  let buttonVariation: ButtonVariant = "primary";

  if (type === "correct") {
    buttonVariation = "correct";
  } else if (type === "wrong") {
    buttonVariation = "wrong";
  }

  if (type === "correct") {
    bgColor = "bg-green-200";
  } else if (type === "wrong") {
    bgColor = "bg-red-200";
  }

  return (
    <div className={`fixed bottom-0 w-full ${bgColor}`}>
      <div className="p-4 max-w-screen-lg m-auto flex items-center justify-between">
        {answer && (
          <div aria-label="answer">
            <strong>{answerValidity}</strong>
            <br />
            {answer}
          </div>
        )}
        <AppButton variant={buttonVariation} onClick={onClick}>
          {buttonText}
        </AppButton>
      </div>
    </div>
  );
}
