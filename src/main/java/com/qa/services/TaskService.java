package com.qa.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.persistence.domain.TaskDomain;
import com.qa.persistence.dtos.TaskDTO;
import com.qa.persistence.repos.TaskRepo;

@Service
public class TaskService {

	private TaskRepo repo;
	private ModelMapper mapper;

	@Autowired
	public TaskService(TaskRepo repo, ModelMapper mapper) {
		super();
		this.repo = repo;
		this.mapper = mapper;
	}

	private TaskDTO mapToDTO(TaskDomain model) {
		return this.mapper.map(model, TaskDTO.class);
	}

//	CREATE
	public TaskDTO create(TaskDomain user) {
		return this.mapToDTO(this.repo.save(user));
	}

//	READ
	public List<TaskDTO> readAll() {
		List<TaskDomain> dbList = this.repo.findAll();
		List<TaskDTO> resultList = dbList.stream().map(this::mapToDTO).collect(Collectors.toList());
		return resultList;
	}

	public TaskDTO readOne(Long id) {
		return mapToDTO(this.repo.findById(id).orElseThrow());

	}

//	UPDATE
	public TaskDTO update(Long id, TaskDomain newHouse) {
		this.repo.findById(id).orElseThrow();
		newHouse.setId(id);
		return this.mapToDTO(this.repo.save(newHouse));
	}

//	DELETE
	public boolean delete(Long id) {

		this.repo.deleteById(id);

		boolean exists = this.repo.existsById(id);

		return !exists;
	}

}
