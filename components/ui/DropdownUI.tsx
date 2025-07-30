import { useThemeColor } from "@/hooks/useThemeColor";
import { Users } from "lucide-react-native";
import React from "react";
import { Image, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ThemedText } from "../ThemedText";

interface DropdownUIProps {
  value: any;
  options: {
    label: string;
    value: any;
    data?: any;
  }[];
  search?: boolean;
  onChange: (item: any) => void;
  dropdownProps?: {
    placeholder?: string;
    searchPlaceholder?: string;
    dropdown?: any;
  };
}

function DropdownUI({
  options,
  value,
  search,
  onChange,
  dropdownProps,
}: DropdownUIProps) {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const primaryColor = useThemeColor({}, "primary");

  const handleChange = (option: any) => {
    onChange(option.value);
  };

  const renderItem = (item: any) => {
    return (
      <View
        style={{
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: backgroundColor,
        }}
      >
        {typeof item.data?.icon?.startsWith === "function" &&
        item.data?.icon?.startsWith("http") ? (
          <Image
            className="w-5 h-5"
            resizeMode="contain"
            source={{
              uri: item.data?.icon,
            }}
          />
        ) : (
          <Image
            className="w-5 h-5"
            resizeMode="contain"
            source={item.data?.icon}
          />
        )}
        <ThemedText className="pl-4 text-left flex-1">{item.label}</ThemedText>
      </View>
    );
  };

  return (
    <Dropdown
      style={{
        height: 48,
        backgroundColor: backgroundColor,
        borderRadius: 12,
        borderColor: iconColor,
        borderWidth: 1,
        paddingHorizontal: 12,
        flex: 1,
        ...dropdownProps?.dropdown,
      }}
      placeholderStyle={{
        fontSize: 16,
        color: iconColor,
      }}
      selectedTextStyle={{
        fontSize: 16,
        color: textColor,
      }}
      inputSearchStyle={{
        height: 40,
        fontSize: 16,
        color: textColor,
        backgroundColor: backgroundColor,
      }}
      iconStyle={{
        width: 20,
        height: 20,
      }}
      data={options}
      search={search}
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={options.find((o) => o.value === value)}
      onChange={handleChange}
      renderLeftIcon={() => {
        const currValue = options.find((o) => o.value === value);
        if (currValue?.data?.icon) {
          let source = currValue.data.icon;
          if (
            typeof currValue.data.icon.startsWith === "function" &&
            currValue.data.icon.startsWith("http")
          ) {
            source = { uri: currValue.data.icon };
          }
          return (
            <Image
              className="w-5 h-5 mr-2"
              resizeMode="contain"
              source={source}
            />
          );
        }
        return <Users size={20} color={primaryColor} className="pr-2" />;
      }}
      renderItem={renderItem}
      {...dropdownProps}
    />
  );
}

export default DropdownUI;
