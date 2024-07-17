package com.project.tmm022_fmb.repository;

import com.project.tmm022_fmb.model.Line;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LineRepository extends JpaRepository<Line, Long> {

    @Query("SELECT COUNT(l) FROM Line l WHERE l.unitId = :unitId AND l.groupId = :groupId AND l.lineId = :lineId AND l.lineDesc = :lineDesc")
    int findLineByIdAndDescription(
            @Param("unitId") String unitId,
            @Param("groupId") String groupId,
            @Param("lineId") String lineId,
            @Param("lineDesc") String lineDesc
    );

    @Query("SELECT COUNT(l) FROM Line l, Part p WHERE l.lineId = p.lineId AND p.unitId = :unitId AND p.groupId = :groupId AND p.lineId = :lineId AND l.lineDesc = :lineDesc")
    int findLineAndPartByIdAndDescription(
            @Param("unitId") String unitId,
            @Param("groupId") String groupId,
            @Param("lineId") String lineId,
            @Param("lineDesc") String lineDesc
    );
}
