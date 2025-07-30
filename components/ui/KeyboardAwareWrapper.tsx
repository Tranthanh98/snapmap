import React, { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingViewProps, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = React.PropsWithChildren<{
  extraScrollHeight?: number;
  contentContainerStyle?: ViewStyle;
  scrollViewProps?: Partial<KeyboardAvoidingViewProps>;
}>;

export const KeyboardAwareWrapper = ({
  children,
  extraScrollHeight = 25,
  contentContainerStyle = {},
  scrollViewProps = {},
}: Props) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={extraScrollHeight}
      scrollEnabled={keyboardVisible}
      contentContainerStyle={[
        {
          flexGrow: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingVertical: 5,
        },
        contentContainerStyle,
      ]}
      {...scrollViewProps}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};
