package com.ateion.backend.service.impl;

import com.ateion.backend.dto.ContactRequestDTO;
import com.ateion.backend.dto.ContactResponseDTO;
import com.ateion.backend.entity.Contact;
import com.ateion.backend.mapper.ContactMapper;
import com.ateion.backend.repository.ContactRepository;
import com.ateion.backend.service.ContactService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;
    private final ContactMapper contactMapper;

    @Override
    @Transactional
    public ContactResponseDTO saveContactMessage(ContactRequestDTO requestDTO) {
        log.info("Saving contact message from email: {}", requestDTO.getEmail());

        Contact contact = contactMapper.toEntity(requestDTO);
        Contact savedContact = contactRepository.save(contact);

        log.info("Contact message saved successfully with id: {}", savedContact.getId());
        return contactMapper.toResponseDTO(savedContact);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContactResponseDTO> getAllMessages() {
        log.info("Fetching all contact messages");

        List<Contact> contacts = contactRepository.findAll();
        log.info("Fetched {} contact messages", contacts.size());

        return contactMapper.toResponseDTOList(contacts);
    }
}
