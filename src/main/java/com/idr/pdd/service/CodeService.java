package com.idr.pdd.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.Code;
import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.Location;
import com.idr.pdd.dto.Shift;
import com.idr.pdd.mapper.BlockMapper;
import com.idr.pdd.mapper.CodeMapper;
import com.idr.pdd.mapper.FactoryMapper;
import com.idr.pdd.mapper.LineMapper;
import com.idr.pdd.mapper.ShiftMapper;

import javassist.bytecode.analysis.ControlFlow.Block;

@Service
public class CodeService {

	@Autowired
	FactoryMapper factoryMapper;
	
	@Autowired
	BlockMapper blockMapper;
	
	@Autowired
	LineMapper lineMapper;
	
	@Autowired
	ShiftMapper shiftMapper;
	
	@Autowired
	CodeMapper codeMapper;
	
	public List<Code> findFactroy(){
		List<Code> list = new ArrayList<>();
		
		for (Factory factory : factoryMapper.find()) {
			Code code = new Code();
			code.setCode(factory.getFactoryid());
			code.setValue(factory.getFactoryname());
			list.add(code);
		}
		
		return list;
	}
	
	public List<Code> findBlock(){
		
		List<Code> list = new ArrayList<>();
		
		for (Location location : blockMapper.find()) {
			Code code = new Code();
			code.setMCode(location.getFactoryid());
			code.setCode(location.getLocationid());
			code.setValue(location.getLocationname());
			list.add(code);
		}
		
		return list;
	}
	
	public List<Code> findLine(){
		
		List<Code> list = new ArrayList<>();
		
		for (Location location : lineMapper.find()) {
			Code code = new Code();
			code.setMCode(location.getFactoryid());
			code.setCode(location.getLocationid());
			code.setValue(location.getLocationname());
			list.add(code);
		}
		
		return list;
	}
	
	public List<Code> findShift(){
		
		List<Code> list = new ArrayList<>();
		
		for (Shift shift : shiftMapper.find()) {
			Code code = new Code();
			code.setCode(shift.getShiftid());
			code.setValue(shift.getShiftname());
			list.add(code);
		}
		
		return list;
	}
	
	public List<Code> findInputItem(){
		
		List<Code> list = codeMapper.find("INPUT_ITEM");
		
		return list;
	}
}
