import React, { ChangeEvent, useContext, useState } from 'react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  ApplicationVerifier,
} from 'firebase/auth';
import { auth } from '../firebase';
import { setCookie } from 'nookies';
import CodeInput from '../components/Inputs/CodeInput';
import { useRouter } from 'next/router';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [otpForm, setOtpForm] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const router = useRouter();

  const generateRecaptcha = (): void => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      { size: 'invisible', callback: (e) => e },
      auth,
    );
  };

  const requestOTP = (event: any) => {
    event.preventDefault();
    if (phoneNumber.length >= 12) {
      setOtpForm(true);
      generateRecaptcha();
      let appVerifier: ApplicationVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confimationResult: ConfirmationResult) => {
          window.confimationResult = confimationResult;
          console.log('sms is sent');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!phoneNumber || phoneNumber.length < 12) {
      setError('Por favor preencha o campo corretamente');
    }
  };

  const pull_data = (otpStringData: string) => {
    setOtp(otpStringData);
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      let confimationResult = window.confimationResult;
      confimationResult.confirm(otp).then((r) => {
        const user = r.user;
        // setCurrentUser(user);
        setCookie(undefined, 'nextauth.token', user.accessToken, {
          maxAge: 60 * 60 * 1, // 1 hour
        });
        router.push('/user/search');
      });
    } else {
      setError('Por favor preencha o campo corretamente');
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 my-40 mx-20 ">
        <div className="grid content-center pl-2">
          <h1 className="font-semibold select-none text-6xl md:text-xl tracking-wide text-gray-800 ">
            Lovyca
          </h1>
        </div>

        {otpForm === false ? (
          <>
            <form
              className=" bg-gray-300 grid grid-rows-2 justify-center gap-4 py-6 px-1 w-full rounded"
              onSubmit={(e) => requestOTP(e)}
            >
              <input
                value={phoneNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPhoneNumber(e.target.value)
                }
                type="tel"
                className="h-10 p-2 w-[100%] outline-none duration-300 border-b-2 border-solid border-white rounded focus:border-teal-500 text-slate-900 "
                placeholder="Celular"
              />
              <button className="bg-teal-600 w-[100%] h-10 rounded duration-300 relative after:absolute after:top-0 after:right-full after:bg-teal-700 after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300">
                <h2 className="relative z-20">Entrar</h2>
              </button>

              {error && (
                <div className="w-[100%] border-rose-400 border text-center border-solid text-rose-400 text-xs p-1">
                  {error}
                </div>
              )}
            </form>
          </>
        ) : null}

        {otpForm === true ? (
          <>
            <form className="bg-gray-300 grid grid-rows-2 justify-center gap-4 py-6 max-w-[60ch] rounded">
              <CodeInput otpString={pull_data} />
              <button
                type="submit"
                className="bg-teal-600 h-10 rounded duration-300 relative after:absolute after:top-0 after:right-full after:bg-teal-700 after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300"
                onClick={verifyOTP}
              >
                <h2 className="relative z-20">Entrar</h2>
              </button>
              {error && (
                <div className="flex justify-center">
                  <div className="w-60  border-rose-400 border text-center border-solid text-rose-400 text-xs p-1">
                    {error}
                  </div>
                </div>
              )}
            </form>
          </>
        ) : null}

        <div id="recaptcha-container"></div>
      </div>
    </>
  );
}
