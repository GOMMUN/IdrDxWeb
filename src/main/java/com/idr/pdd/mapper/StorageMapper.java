package com.idr.pdd.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.idr.pdd.dto.Storage;

@Mapper
public interface StorageMapper {

	List<Storage> find();
}
