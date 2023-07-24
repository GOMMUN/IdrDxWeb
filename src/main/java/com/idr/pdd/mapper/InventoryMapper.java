package com.idr.pdd.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.idr.pdd.dto.Inventory;

@Mapper
public interface InventoryMapper {

	List<Inventory> findAll();
	Inventory find();
	
	int create(Inventory param);
	int modify(Inventory param);
	int remove(List<Integer> param);
	int countByInventory(Inventory param);
}
