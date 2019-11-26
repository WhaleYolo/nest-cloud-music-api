import { Injectable, Inject, HttpService, BadRequestException } from '@nestjs/common';
import { TopSongDto, BannerDto, SongDetailsDto, AlbumDto, AlbumDetailDynamicDto, AlbumSubDto, AlbumSubListDto, ArtistsDto, ArtistsMvDto, ArtistsAlbumDto, ArtistsDescDto, SimiMvDto, SimiUserDto, dailySigninDto, LikeDto, LikeListDto, FmTrashDto, TopAlbumDto, ScrobbleDto, TopArtistsDto, MvAllDto, MvFirstDto } from '../dto/cloudmusic.dto';

@Injectable()
export class CloudMusicService {


    // 网易云提供的 Api 接口http://musicapi.leanapp.cn/
    // private readonly cloudMusicApi = 'https://music.aityp.com/';

    private readonly cloudMusicApi = 'http://localhost:3000/';

    constructor(@Inject(HttpService) private readonly httpService: HttpService) {
        this.cloudMusicApi = this.cloudMusicApi;
    }
    async topSong(topSongDto: TopSongDto) {
        if (!topSongDto.type) {
            throw new BadRequestException(`type  must be passed`)
        }
        const bashApi = this.cloudMusicApi + `top/song?type=${topSongDto.type}`;
        const data = await this.httpService.get(bashApi).toPromise();
        return await data.data;
    }
    async banner(bannerDto: BannerDto) {
        // 默认为0，即PC
        const data = {
            type: bannerDto.type || 0
        }
        const bashApi = this.cloudMusicApi + `banner?type=${data.type}`;
        const res = await this.httpService.post(bashApi, data).toPromise();
        return await res.data;
    }

    async songDetails(songDetails: SongDetailsDto) {
        if (!songDetails.ids) {
            throw new BadRequestException(`ids  must be passed`);
        }
        const bashApi = this.cloudMusicApi + `song/detail?ids=${songDetails.ids}`;
        const res = await this.httpService.post(bashApi, songDetails).toPromise();
        return await res.data;
    }

    async album(albumDto: AlbumDto) {
        if (!albumDto.id) {
            throw new BadRequestException(`id  must be passed`);
        }
        const bashApi = this.cloudMusicApi + `album?id=${albumDto.id}`;
        const res = await this.httpService.post(bashApi, albumDto).toPromise();
        return await res.data;
    }

    async albumDetailDynamic(albumDetailDynamicDto: AlbumDetailDynamicDto) {
        if (!albumDetailDynamicDto.id) {
            throw new BadRequestException('id must be passed');
        }
        const bashApi = this.cloudMusicApi + `album/detail/dynamic?id=${albumDetailDynamicDto.id}`;
        const res = await this.httpService.post(bashApi, albumDetailDynamicDto).toPromise();
        return await res.data;
    }

    async albumSub(albumSubDto: AlbumSubDto) {
        if (!albumSubDto.id) {
            throw new BadRequestException('id must be passed');
        }
        if (!albumSubDto.t) {
            throw new BadRequestException('t must be passed');
        }
        const bashApi = this.cloudMusicApi + `album/sub?id=${albumSubDto.id}&t=${albumSubDto.t}`;
        const res = await this.httpService.post(bashApi, albumSubDto).toPromise();
        return await res.data;
    }

    async albumSubList(albumSubListDto: AlbumSubListDto) {
        const data = {
            limit: albumSubListDto.limit || 25,
            off: albumSubListDto.offset || 0
        }
        const bashApi = this.cloudMusicApi + `album/sublist`;
        const res = await this.httpService.post(bashApi, data).toPromise();
        return await res.data;
    }

    async artists(artistsDto: ArtistsDto) {
        if (!artistsDto.id) {
            throw new BadRequestException('id must  be passed');
        }
        const bashApi = this.cloudMusicApi + `artists?id=${artistsDto.id}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async artistsMv(artistsMvDto: ArtistsMvDto) {
        if (!artistsMvDto.id) {
            throw new BadRequestException('id must  be passed');
        }
        const bashApi = this.cloudMusicApi + `artists/mv?id=${artistsMvDto.id}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async artistsAlbum(artistsAlbumDto: ArtistsAlbumDto) {
        if (!artistsAlbumDto.id) {
            throw new BadRequestException('id must  be passed');
        }
        const data = {
            limit: artistsAlbumDto.limit || 50,
            offset: artistsAlbumDto.offset || 0
        }
        const bashApi = this.cloudMusicApi + `artist/album?id=${artistsAlbumDto.id}&limit=${artistsAlbumDto.limit}&offset=${artistsAlbumDto.offset}`;
        const res = await this.httpService.post(bashApi, data).toPromise();
        return await res.data;
    }

    async artistDesc(artistsDescDto: ArtistsDescDto) {
        if (!artistsDescDto.id) {
            throw new BadRequestException('id must  be passed');
        }
        const bashApi = this.cloudMusicApi + `artist/desc?id=${artistsDescDto.id}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async simiArtist(artistsDescDto: ArtistsDescDto) {
        if (!artistsDescDto.id) {
            throw new BadRequestException('id must  be passed');
        }
        const bashApi = this.cloudMusicApi + `simi/artist?id=${artistsDescDto.id}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }
    async simiPlaylist(artistsDescDto: ArtistsDescDto) {
        if (!artistsDescDto.id) {
            throw new BadRequestException('id must  be passed');
        }
        const bashApi = this.cloudMusicApi + `simi/playlist?id=${artistsDescDto.id}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async simiMv(simiMvDto: SimiMvDto) {
        if (!simiMvDto.mvid) {
            throw new BadRequestException('mvid must  be passed');
        }
        const bashApi = this.cloudMusicApi + `simi/mv?mvid=${simiMvDto.mvid}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async simiSong(simiSongDto: ArtistsDescDto) {
        if (!simiSongDto.id) {
            throw new BadRequestException('id must  be passed');
        }
        const bashApi = this.cloudMusicApi + `simi/song?id=${simiSongDto.id}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async simiUser(simiUserDto: SimiUserDto) {
        if (!simiUserDto.id) {
            throw new BadRequestException('id must  be passed');
        }
        const bashApi = this.cloudMusicApi + `simi/user?id=${simiUserDto.id}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async recommendResource() {
        const bashApi = this.cloudMusicApi + `recommend/resource`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }
    async recommendSongs() {
        const bashApi = this.cloudMusicApi + `recommend/songs`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }
    async  personalFm() {
        const bashApi = this.cloudMusicApi + `personal_fm`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async dailySignin(dailySigninDto: dailySigninDto) {
        const data = {
            type: dailySigninDto.type || 0
        }
        const bashApi = this.cloudMusicApi + `daily_signin`;
        const res = await this.httpService.post(bashApi, data).toPromise();
        return await res.data;
    }

    async like(likeDto: LikeDto) {
        if (!likeDto.id) {
            throw new BadRequestException('id must  be passed');
        }
        const data = {
            like: likeDto.like || true
        }
        const bashApi = this.cloudMusicApi + `simi/song?id=${likeDto.id}&like=${data.like}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async likeList(likeListDto: LikeListDto) {
        if (!likeListDto.uid) {
            throw new BadRequestException('uid must be passed');
        }
        const bashApi = this.cloudMusicApi + `likelist?uid=${likeListDto.uid}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async fmTrash(fmTrashDto: FmTrashDto) {
        if (!fmTrashDto.id) {
            throw new BadRequestException('uid must be passed');
        }
        const bashApi = this.cloudMusicApi + `fm_trash?id=${fmTrashDto.id}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async topAlbum(topAlbumDto: TopAlbumDto) {
        const data = {
            offset: topAlbumDto.offset || 0,
            limit: topAlbumDto.limit || 50
        }
        const bashApi = this.cloudMusicApi + `top/album?offset=${data.offset}&limit=${data.limit}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async albumNewest() {
        const bashApi = this.cloudMusicApi + `album/newest`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async scrobble(scrobbleDto: ScrobbleDto) {
        if (!scrobbleDto.id) {
            throw new BadRequestException('id must be passed ');
        }
        if (!scrobbleDto.sourceid) {
            throw new BadRequestException('sourceid be passed');
        }
        const bashApi = this.cloudMusicApi + `scrobble/id=${scrobbleDto.id}&sourceid=${scrobbleDto.sourceid}&time=${scrobbleDto.time}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async topArtists(topArtistsDto: TopArtistsDto) {
        const data = {
            offset: topArtistsDto.offset || 0,
            limit: topArtistsDto.limit || 50
        }
        const bashApi = this.cloudMusicApi + `top/artists?offset=${data.offset}&limit=${data.limit}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async mvAll(mvAllDto: MvAllDto) {
        const data = {
            area: mvAllDto.area || '全部',
            type: mvAllDto.type || '全部',
            order: mvAllDto.order || '上升最快',
            limit: mvAllDto.limit || 50,
            offset: mvAllDto.offset || 0
        };
        /**
         * 需要bashApi中代的中文字符进行转义
         */
        const bashApi = encodeURI(this.cloudMusicApi + `mv/all?area=${data.area}&type=${data.type}&order=${data.order}&limit=${data.limit}&offset=${data.offset}`);
        const res = await this.httpService.post(bashApi).toPromise();
        return await res.data;
    }

    async mvFirst(mvFirstDto: MvFirstDto){
        const data ={
            area: mvFirstDto.area || '',
            limit: mvFirstDto.limit || 50
        };
        const bashApi = encodeURI(this.cloudMusicApi + `mv/first?area=${data.area}&limit=${data.limit}`);
        const res = await this.httpService.post(bashApi).toPromise();
        return await res.data;
    }
}
