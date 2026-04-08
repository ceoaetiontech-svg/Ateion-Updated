package com.ateion.backend.service;

import com.ateion.backend.dto.ContactRequestDTO;
import com.ateion.backend.dto.ContactResponseDTO;
import java.util.List;

public interface ContactService {

    ContactResponseDTO saveContactMessage(ContactRequestDTO requestDTO);

    List<ContactResponseDTO> getAllMessages();
}
