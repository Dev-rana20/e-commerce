package com.kelys.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddressRequest {
    @NotBlank
    private String streetAddress;
    
    @NotBlank
    private String city;
    
    @NotBlank
    private String state;
    
    @NotBlank
    private String zipCode;
    
    private String country;
    private boolean isDefault;
}
