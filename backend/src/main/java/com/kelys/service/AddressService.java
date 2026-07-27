package com.kelys.service;

import com.kelys.dto.request.AddressRequest;
import com.kelys.dto.response.AddressResponse;
import com.kelys.entity.Address;
import com.kelys.entity.User;
import com.kelys.exception.ResourceNotFoundException;
import com.kelys.exception.UnauthorizedException;
import com.kelys.repository.AddressRepository;
import com.kelys.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public List<AddressResponse> getUserAddresses(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return addressRepository.findByUserIdOrderByIsDefaultDesc(user.getId()).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public AddressResponse addAddress(AddressRequest req, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (req.isDefault()) {
            List<Address> addresses = addressRepository.findByUserId(user.getId());
            addresses.forEach(a -> a.setIsDefault(false));
            addressRepository.saveAll(addresses);
        }

        Address address = Address.builder()
                .user(user)
                .streetAddress(req.getStreetAddress())
                .city(req.getCity())
                .state(req.getState())
                .zipCode(req.getZipCode())
                .country(req.getCountry())
                .isDefault(req.isDefault())
                .build();

        return mapToResponse(addressRepository.save(address));
    }

    public AddressResponse updateAddress(Long id, AddressRequest req, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));
        
        if (!address.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("Not authorized to update this address");
        }

        if (req.isDefault() && !address.getIsDefault()) {
            List<Address> addresses = addressRepository.findByUserId(user.getId());
            addresses.forEach(a -> a.setIsDefault(false));
            addressRepository.saveAll(addresses);
        }

        address.setStreetAddress(req.getStreetAddress());
        address.setCity(req.getCity());
        address.setState(req.getState());
        address.setZipCode(req.getZipCode());
        address.setCountry(req.getCountry());
        address.setIsDefault(req.isDefault());

        return mapToResponse(addressRepository.save(address));
    }

    public void deleteAddress(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));
        
        if (!address.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("Not authorized to delete this address");
        }

        addressRepository.delete(address);
    }

    private AddressResponse mapToResponse(Address a) {
        return AddressResponse.builder()
                .id(a.getId())
                .streetAddress(a.getStreetAddress())
                .city(a.getCity())
                .state(a.getState())
                .zipCode(a.getZipCode())
                .country(a.getCountry())
                .isDefault(a.getIsDefault())
                .build();
    }
}
