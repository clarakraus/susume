package com.github.clarakraus.susume.streamingProvider;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProviderResponse {
    private ProviderCountry results;
}
