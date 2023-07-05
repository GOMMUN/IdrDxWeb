package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.Person;
import com.idr.pdd.dto.Shift;
import com.idr.pdd.mapper.FactoryInfoMapper;
import com.idr.pdd.mapper.GroupShiftInfoMapper;
import com.idr.pdd.mapper.PersonMapper;

@Service
public class PersonService {

	@Autowired
	PersonMapper mapper;

	public List<Person> findAll() {
		
		return mapper.findall();
	}
}
