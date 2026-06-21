package com.ateion.backend.mapper;

import com.ateion.backend.dto.ContactRequestDTO;
import com.ateion.backend.dto.ContactResponseDTO;
import com.ateion.backend.entity.Contact;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Manual mapper — replaces MapStruct @Mapper so no annotation processing
 * is required at compile time. Spring Boot picks this up as a plain bean.
 */
@Component
public class ContactMapper {

    public Contact toEntity(ContactRequestDTO requestDTO) {
        if (requestDTO == null) return null;
        return Contact.builder()
                .name(requestDTO.getName())
                .email(requestDTO.getEmail())
                .subject(requestDTO.getSubject())
                .message(requestDTO.getMessage())
                // id and createdAt are set by JPA / @CreationTimestamp
                .build();
    }

    public ContactResponseDTO toResponseDTO(Contact contact) {
        if (contact == null) return null;
        return ContactResponseDTO.builder()
                .id(contact.getId())
                .name(contact.getName())
                .email(contact.getEmail())
                .subject(contact.getSubject())
                .message(contact.getMessage())
                .createdAt(contact.getCreatedAt())
                .build();
    }

    public List<ContactResponseDTO> toResponseDTOList(List<Contact> contacts) {
        if (contacts == null) return List.of();
        return contacts.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }
}
