import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsIn, IsArray } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class BaseQueryDto {
    @ApiModelProperty({ description: '通用分页-页数', required: false, default: 1 })
    @IsNumber()
    @Type(() => Number)
    readonly page: number = 1;

    @ApiModelProperty({ description: '通用分页-每页数量', required: false, default: 25 })
    @IsNumber()
    @Type(() => Number)
    readonly pageSize: number = 25;

    @ApiModelPropertyOptional({ description: '通用分页-分页模式, 非特殊情况不用传递  默认分页  传递值为no表示不分页' })
    @IsIn(['no'])
    readonly pageMode?: string;

    @ApiModelPropertyOptional({ description: `通用排序, 例如[['createdAt', 'desc'],['name', 'asc']]`, type: [String], example: [['name', 'desc']] })
    @IsArray() @Transform(value => value === '' || value === undefined ? undefined : JSON.parse(value))
    readonly orderBy?: [string, 'DESC' | 'ASC'][];
}

/**
 * 网易云音乐Api Dto
 */

export class BannerDto {
    @ApiModelProperty({ description: 'type:资源类型,对应以下类型,默认为 0 即PC ', default: 0, required: false })
    type: number;
}

export class SongDetailsDto {
    @ApiModelProperty({ description: '必选参数 : ids: 音乐 id, 如 ids=347230 ', required: true })
    ids: string;
}

export class DailySigninDto {
    @ApiModelProperty({ description: ' type: 签到类型 , 默认 0, 其中 0 为安卓端签到 ,1 为 web/PC 签到', default: 0, required: false })
    type: number;
}
export class TopDetailDto {
    @ApiModelProperty({ description: ' 必选参数 : mvid', required: true })
    mvid: string;
}
export class FmTrashDto {
    @ApiModelProperty({ description: '必选参数 : id: 歌曲 id', required: true })
    id: string;
}

export class ScrobbleDto {
    @ApiModelProperty({ description: 'id: 歌曲 id', required: true })
    id: string;
    @ApiModelProperty({ description: 'sourceid: 歌单或专辑 id', required: true })
    sourceid: string;
    @ApiModelProperty({ description: ' time: 歌曲播放时间,单位为秒', required: false })
    time: number;
}

export class RelatedAllvideoDto {
    @ApiModelProperty({ description: ' 必选参数 : id: 视频 的 id', required: true })
    id: string;
}
