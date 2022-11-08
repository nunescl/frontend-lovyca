import React, { useEffect, useRef, useState } from 'react';

let currentOtpIndex: number = 0;

export default function CodeInput({ ...props }): JSX.Element {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOtpIndex] = value.substring(value.length - 1);

    if (!value) {
      setActiveOtpIndex(currentOtpIndex - 1);
    } else {
      setActiveOtpIndex(currentOtpIndex + 1);
    }
    setOtp(newOTP);
  };

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    currentOtpIndex = index;
    if (key === 'Backspace') {
      setActiveOtpIndex(currentOtpIndex - 1);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  const otpString: string = otp.join('');
  props.otpString(otpString);

  return (
    <div className="flex justify-center items-center space-x-2">
      {otp.map((_, index) => {
        return (
          <React.Fragment key={index}>
            <input
              ref={index === activeOtpIndex ? inputRef : null}
              type="number"
              className="h-9 w-9 p-3.5 m-1 outline-none duration-300 border-b-2 border-solid border-white rounded focus:border-teal-500 text-slate-900 spin-button-none"
              onChange={handleOnChange}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              value={otp[index]}
              placeholder={'-'}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}
