package com.ateion.backend.mapper;

import com.ateion.backend.dto.ContactRequestDTO;
import com.ateion.backend.dto.ContactResponseDTO;
import com.ateion.backend.entity.Contact;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ContactMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Contact toEntity(ContactRequestDTO requestDTO);

    ContactResponseDTO toResponseDTO(Contact contact);

    List<ContactResponseDTO> toResponseDTOList(List<Contact> contacts);
}
