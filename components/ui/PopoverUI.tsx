import React, { forwardRef, useRef, useState } from "react";
import { Modal, Platform, TouchableOpacity, View } from "react-native";

interface PopoverUIProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  trigger: React.ReactNode;
  placement?: "bottom" | "top" | "left" | "right";
  offset?: { x?: number; y?: number };
}

const PopoverUI = forwardRef<View, PopoverUIProps>(
  (
    {
      open,
      onClose,
      children,
      trigger,
      placement = "bottom",
      offset = { x: 0, y: 0 },
    },
    ref
  ) => {
    const triggerRef = useRef<View>(null);
    const [triggerLayout, setTriggerLayout] = useState({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    const handleTriggerLayout = () => {
      if (triggerRef.current) {
        triggerRef.current.measure((x, y, width, height, pageX, pageY) => {
          setTriggerLayout({ x: pageX, y: pageY, width, height });
        });
      }
    };

    const getPopoverPosition = () => {
      const popoverWidth = 200; // Approximate width
      const popoverHeight = 150; // Approximate height
      const offsetX = offset.x || 0;
      const offsetY = offset.y || 0;

      switch (placement) {
        case "top":
          return {
            left:
              triggerLayout.x +
              triggerLayout.width / 2 -
              popoverWidth / 2 +
              offsetX,
            top: triggerLayout.y - popoverHeight - 8 + offsetY,
          };
        case "left":
          return {
            left: triggerLayout.x - popoverWidth - 8 + offsetX,
            top:
              triggerLayout.y +
              triggerLayout.height / 2 -
              popoverHeight / 2 +
              offsetY,
          };
        case "right":
          return {
            left: triggerLayout.x + triggerLayout.width + 8 + offsetX,
            top:
              triggerLayout.y +
              triggerLayout.height / 2 -
              popoverHeight / 2 +
              offsetY,
          };
        case "bottom":
        default:
          return {
            left:
              triggerLayout.x +
              triggerLayout.width / 2 -
              popoverWidth / 2 +
              offsetX,
            top: triggerLayout.y + triggerLayout.height + 8 + offsetY,
          };
      }
    };

    const popoverPosition = getPopoverPosition();

    return (
      <View ref={ref}>
        <View ref={triggerRef} onLayout={handleTriggerLayout}>
          {trigger}
        </View>
        <Modal
          visible={open}
          transparent
          animationType="fade"
          onRequestClose={onClose}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
            onPress={onClose}
            activeOpacity={1}
          >
            <View
              style={{
                position: "absolute",
                left: popoverPosition.left,
                top: popoverPosition.top,
                backgroundColor:
                  Platform.OS === "web"
                    ? "rgba(0, 0, 0, 0.9)"
                    : "rgba(0, 0, 0, 0.8)",
                borderRadius: 12,
                padding: 16,
                minWidth: 150,
                maxWidth: 250,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              {children}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
);

PopoverUI.displayName = "PopoverUI";

export default PopoverUI;
