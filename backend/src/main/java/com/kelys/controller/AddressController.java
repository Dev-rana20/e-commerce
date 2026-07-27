package com.kelys.controller;

import com.kelys.dto.request.AddressRequest;
import com.kelys.dto.response.AddressResponse;
import com.kelys.service.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {
	
    private final AddressService addressService;

    @GetMapping({"", "/"})
    public ResponseEntity<List<AddressResponse>> getUserAddresses(Authentication auth) {
        return ResponseEntity.ok(addressService.getUserAddresses(auth.getName()));
    }

    @PostMapping({"", "/"})
    public ResponseEntity<AddressResponse> addAddress(@Valid @RequestBody AddressRequest req, Authentication auth) {
        return new ResponseEntity<>(addressService.addAddress(req, auth.getName()), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressResponse> updateAddress(
            @PathVariable Long id,
            @Valid @RequestBody AddressRequest req,
            Authentication auth) {
        return ResponseEntity.ok(addressService.updateAddress(id, req, auth.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id, Authentication auth) {
        addressService.deleteAddress(id, auth.getName());
        return ResponseEntity.noContent().build();
    }
}
