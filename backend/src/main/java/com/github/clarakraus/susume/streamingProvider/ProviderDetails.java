package com.github.clarakraus.susume.streamingProvider;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProviderDetails {
    @JsonProperty ("provider_name")
    private String providerName;
}
