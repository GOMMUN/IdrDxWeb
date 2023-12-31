package com.idr.pdd.controller; 



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.WorkerInfo;
import com.idr.pdd.service.WorkerInfoService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("workerinfo")
public class WorkerInfoController {

	@Autowired
	private WorkerInfoService service;
	
	@GetMapping("")
    public String init() {
        return "page/workerinfo";
    }
	
	@ResponseBody
	@GetMapping("/find")
    public List<WorkerInfo> find() {
		List<WorkerInfo> list = service.findAll();
		return list;
    }	
	
	@ResponseBody
	@PostMapping("/create")
    public int create(@RequestBody WorkerInfo param) {
		return service.save(param);
    }
	
	@ResponseBody
	@PutMapping("/modify")
    public int modify(@RequestBody WorkerInfo param) {
		return service.save(param);
    }
	
	@ResponseBody
	@PutMapping("/remove")
    public int remove(@RequestBody List<Integer> param) {
		return service.remove(param);
    }
}
