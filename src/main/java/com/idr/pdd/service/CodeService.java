package com.idr.pdd.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.Code;
import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.Location;
import com.idr.pdd.dto.Material;
import com.idr.pdd.dto.ModelNM;
import com.idr.pdd.dto.Shift;
import com.idr.pdd.dto.Storage;
import com.idr.pdd.mapper.BlockMapper;
import com.idr.pdd.mapper.CodeMapper;
import com.idr.pdd.mapper.FactoryMapper;
import com.idr.pdd.mapper.LineMapper;
import com.idr.pdd.mapper.MaterialMasterMapper;
import com.idr.pdd.mapper.ModelMapper;
import com.idr.pdd.mapper.ShiftMapper;
import com.idr.pdd.mapper.StorageMapper;

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
	
	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	MaterialMasterMapper matarialMapper;
	
	@Autowired
	StorageMapper storageMapper;
	
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
			code.setMCode(shift.getFactoryid());
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

	public List<Code> findmodelItem() {
		List<Code> list = new ArrayList<>();
		
		for (ModelNM model : modelMapper.modelfind()) {
			Code code = new Code();
			code.setCode(model.getModelid());
			code.setValue(model.getModelname());
			list.add(code);
		}
		return list;
	}

	public List<Code> findrejectItem() {
		List<Code> list = codeMapper.find("REJECT_ITEMID");
		
		return list;
	}

	public List<Code> findmatarial() {
		List<Code> list = new ArrayList<>();
		
		for (Material model : matarialMapper.findAll()){
			Code code = new Code();
			code.setMCode(model.getFactoryid());
			code.setCode(model.getMaterialid());
			code.setValue(model.getMaterialname());
			list.add(code);
		}
		return list;
	}
	
	public List<Code> findStorage() {
		List<Code> list = new ArrayList<>();
		
		for (Storage storage : storageMapper.find()) {
			Code code = new Code();
			code.setMCode(storage.getFactoryid());
			code.setCode(storage.getStorageid());
			code.setValue(storage.getStoragename());
			list.add(code);
		}
		return list;
	}
	
	public List<Code> findRejectType() {
		List<Code> list = codeMapper.findRejectType();
		
		return list;
	}
}
