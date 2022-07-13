package com.github.clarakraus.susume.streamingProvider;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProviderModel {
   private ArrayList<ProviderDetails> flatrate;
   private ArrayList<ProviderDetails> rent;
   private ArrayList<ProviderDetails> buy;

}
