package com.project.tmm022_fmb.repository;

import com.project.tmm022_fmb.model.Part;
import com.project.tmm022_fmb.model.Line;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartRepository extends JpaRepository<Part, Long> {

    @Query("SELECT p FROM Part p WHERE p.partNumber = :partNumber AND p.unitId = :unitId AND p.partStatus = 'A'")
    Part findPartByNumber(@Param("partNumber") String partNumber, @Param("unitId") String unitId);

    @Query("SELECT p FROM Part p WHERE p.partNumber = :partNumber AND p.unitId = :unitId AND p.groupId = :groupId AND p.lineId = :lineId AND p.partId = :partId")
    Part findPartByNumberForEdit(@Param("partNumber") String partNumber, @Param("unitId") String unitId, @Param("groupId") String groupId, @Param("lineId") String lineId, @Param("partId") String partId);

    @Query("SELECT DISTINCT g.groupId, g.groupName FROM GroupMaster g WHERE g.groupStatus = 'O' AND g.unitId = :unitId ORDER BY g.groupId ASC")
    List<Object[]> findGroupLOV(@Param("unitId") String unitId);

    @Query("SELECT DISTINCT g.groupId, g.groupName FROM GroupMaster g, Part p WHERE g.groupId = p.groupId AND p.unitId = :unitId ORDER BY g.groupId ASC")
    List<Object[]> findEditGroupLOV(@Param("unitId") String unitId);

    @Query("SELECT COUNT(g) FROM GroupMaster g WHERE g.groupId = :groupId AND g.groupName = :groupName AND g.unitId = :unitId AND g.groupStatus = 'O'")
    int validateGroupId(@Param("groupId") String groupId, @Param("groupName") String groupName, @Param("unitId") String unitId);

    @Query("SELECT COUNT(u) FROM UnitMaster u WHERE u.unitId = :unitId AND u.unitName = :unitName")
    int findUnitInMESUnitMaster(@Param("unitId") String unitId, @Param("unitName") String unitName);

    @Query("SELECT COUNT(p) FROM Part p WHERE p.unitId = :unitId AND p.unitName = :unitName")
    int findUnitInHPMPartMaster(@Param("unitId") String unitId, @Param("unitName") String unitName);

    @Query("SELECT COUNT(l) FROM Line l WHERE l.lineId = :lineId AND l.lineDescription = :lineDescription AND l.unitId = :unitId AND l.groupId = :groupId")
    int findLineByIdAndDescription(@Param("lineId") String lineId, @Param("lineDescription") String lineDescription, @Param("unitId") String unitId, @Param("groupId") String groupId);

    @Override
    <S extends Part> S save(S entity);

    @Override
    <S extends Part> S saveAndFlush(S entity);
}
