package com.github.clarakraus.susume.notifications;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Notification {
    private String notifyMessage;
    private String category;
}
