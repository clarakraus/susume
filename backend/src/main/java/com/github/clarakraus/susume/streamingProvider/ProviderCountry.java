package com.github.clarakraus.susume.streamingProvider;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProviderCountry {
    @JsonProperty("AT")
    private ProviderModel at;
    @JsonProperty("DE")
    private ProviderModel de;
    @JsonProperty("CH")
    private ProviderModel ch;
    @JsonProperty("DK")
    private ProviderModel dk;
    @JsonProperty("NO")
    private ProviderModel no;
    @JsonProperty("RU")
    private ProviderModel ru;
    @JsonProperty("SE")
    private ProviderModel se;
    @JsonProperty("SK")
    private ProviderModel sk;
    @JsonProperty("BE")
    private ProviderModel be;
    @JsonProperty("FI")
    private ProviderModel fi;
    @JsonProperty("GB")
    private ProviderModel gb;
    @JsonProperty("IT")
    private ProviderModel it;
    @JsonProperty("JP")
    private ProviderModel jp;
    @JsonProperty("PL")
    private ProviderModel pl;
    @JsonProperty("US")
    private ProviderModel us;

}
