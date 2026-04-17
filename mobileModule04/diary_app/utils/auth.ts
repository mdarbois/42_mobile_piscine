import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "./supabase";

WebBrowser.maybeCompleteAuthSession();

const redirectTo = AuthSession.makeRedirectUri({
  scheme: "diaryapp",
  path: "auth/callback",
});

const parseTokens = (url: string) => {
  const [, fragment] = url.split("#");
  const params = new URLSearchParams(fragment);

  return {
    access_token: params.get("access_token"),
    refresh_token: params.get("refresh_token"),
  };
};

export const auth = {
  loginGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    if (!data?.url) return;

    const result = await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectTo
    );


    if (result.type === "success" && result.url) {
      const { access_token, refresh_token } = parseTokens(result.url);

      if (!access_token || !refresh_token) {
        console.log("❌ Missing tokens in redirect");
        return;
      }

      const { data: sessionData, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

    }
  },

  loginGithub: async () => {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo,
      },
    });

    if (!data?.url) return;

    const result = await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectTo
    );

    if (result.type === "success" && result.url) {
      const { access_token, refresh_token } = parseTokens(result.url);

      if (!access_token || !refresh_token) {
        console.log("❌ Missing tokens in GitHub redirect");
        return;
      }

      const { data: sessionData, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

    }
  },
};