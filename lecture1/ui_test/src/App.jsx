import { useState } from 'react'
import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Fade, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Grow, InputLabel, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Radio, RadioGroup, Select, Slide, Slider, Stack, TextField, Toolbar, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MailIcon from '@mui/icons-material/Mail'
import SettingsIcon from '@mui/icons-material/Settings'
import BookmarkIcon from '@mui/icons-material/Bookmark'

const VARIANTS = ['contained', 'outlined', 'text']
const COLORS = ['primary', 'secondary', 'error']
const INPUT_VARIANTS = ['standard', 'outlined', 'filled']
const NAV_MENUS = ['홈', '소개', '서비스', '연락처']
const CITIES = ['서울', '부산', '대구', '인천', '광주', '대전']
const CHECKBOX_ITEMS = ['React', 'Vue', 'Angular', 'Svelte', 'Next.js']
const PLAN_OPTIONS = ['무료', '스탠다드', '프리미엄', '엔터프라이즈']
const CARD_DATA = [
  { id: 1, title: 'React', desc: '사용자 인터페이스를 만들기 위한 JavaScript 라이브러리', color: '#61dafb' },
  { id: 2, title: 'TypeScript', desc: 'JavaScript에 정적 타입을 추가한 프로그래밍 언어', color: '#3178c6' },
  { id: 3, title: 'MUI', desc: 'React용 오픈소스 컴포넌트 라이브러리', color: '#007fff' },
  { id: 4, title: 'Vite', desc: '빠른 프론트엔드 개발 빌드 도구', color: '#646cff' },
]
const DND_INITIAL = ['디자인', '개발', '테스트', '배포', '유지보수']
const MENU_ITEMS = [
  { label: '홈', icon: <HomeIcon fontSize="small" /> },
  { label: '프로필', icon: <PersonIcon fontSize="small" /> },
  { label: '장바구니', icon: <ShoppingCartIcon fontSize="small" /> },
  { label: '메시지', icon: <MailIcon fontSize="small" /> },
  { label: '저장목록', icon: <BookmarkIcon fontSize="small" /> },
  { label: '설정', icon: <SettingsIcon fontSize="small" /> },
]
const FLEX_NAV_ITEMS = ['홈', '소개', '상품', '연락처', '설정']
const SCROLL_ITEMS = Array.from({ length: 20 }, (_, i) => `아이템 ${i + 1} — 스크롤 가능한 콘텐츠 목록입니다`)

const App = () => {
  const [city, setCity] = useState('')
  const [checked, setChecked] = useState(CHECKBOX_ITEMS.map(() => false))
  const [plan, setPlan] = useState('')
  const [sliderValue, setSliderValue] = useState(30)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [selectedMenu, setSelectedMenu] = useState('')
  const [fadeIn, setFadeIn] = useState(false)
  const [growIn, setGrowIn] = useState(false)
  const [slideIn, setSlideIn] = useState(false)

  const handleAnimate = (setter) => {
    setter(false)
    setTimeout(() => setter(true), 50)
  }
  const [sourceItems, setSourceItems] = useState(DND_INITIAL)
  const [droppedItems, setDroppedItems] = useState([])
  const [draggingItem, setDraggingItem] = useState(null)

  const handleDragStart = (item) => setDraggingItem(item)

  const handleDropToZone = () => {
    if (!draggingItem || droppedItems.includes(draggingItem)) return
    setDroppedItems((prev) => [...prev, draggingItem])
    setSourceItems((prev) => prev.filter((i) => i !== draggingItem))
    setDraggingItem(null)
  }

  const handleDropToSource = () => {
    if (!draggingItem || sourceItems.includes(draggingItem)) return
    setSourceItems((prev) => [...prev, draggingItem])
    setDroppedItems((prev) => prev.filter((i) => i !== draggingItem))
    setDraggingItem(null)
  }

  const allChecked = checked.every(Boolean)
  const indeterminate = checked.some(Boolean) && !allChecked

  const handleToggleAll = () => {
    setChecked(checked.map(() => !allChecked))
  }

  const handleToggleItem = (index) => {
    setChecked(checked.map((v, i) => (i === index ? !v : v)))
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          UI Test
        </Typography>

        {/* Button 섹션 */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Button
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack spacing={2}>
          {VARIANTS.map((variant) => (
            <Box key={variant}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {variant}
              </Typography>
              <Stack direction="row" spacing={2}>
                {COLORS.map((color) => (
                  <Button key={color} variant={variant} color={color}>
                    {color}
                  </Button>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>

        {/* Input 섹션 */}
        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          Input
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack spacing={4}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              기본 / error
            </Typography>
            <Stack direction="row" spacing={3} alignItems="flex-start">
              {INPUT_VARIANTS.map((variant) => (
                <Stack key={variant} direction="row" spacing={2} alignItems="flex-start">
                  <TextField variant={variant} label={variant} />
                  <TextField variant={variant} label={`${variant} error`} error helperText="오류 메시지" />
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>

        {/* Navigation 섹션 */}
        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          Navigation
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <AppBar position="static" sx={{ borderRadius: 1 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Logo
            </Typography>
            {NAV_MENUS.map((menu) => (
              <Button
                key={menu}
                color="inherit"
                onClick={() => alert(`${menu} 클릭`)}
              >
                {menu}
              </Button>
            ))}
          </Toolbar>
        </AppBar>

        {/* 메뉴Dropdown 섹션 */}
        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          메뉴Dropdown
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack direction="row" spacing={4} alignItems="center">
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>도시 선택</InputLabel>
            <Select value={city} label="도시 선택" onChange={(e) => setCity(e.target.value)}>
              {CITIES.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="body1" color="text.secondary">
            선택된 값: <strong>{city || '없음'}</strong>
          </Typography>
        </Stack>

        {/* Checkbox 섹션 */}
        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          Checkbox
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <FormGroup>
          <FormControlLabel
            label="전체 선택"
            control={
              <Checkbox
                checked={allChecked}
                indeterminate={indeterminate}
                onChange={handleToggleAll}
              />
            }
          />
          <Divider sx={{ my: 1 }} />
          {CHECKBOX_ITEMS.map((item, index) => (
            <FormControlLabel
              key={item}
              label={item}
              control={
                <Checkbox
                  checked={checked[index]}
                  onChange={() => handleToggleItem(index)}
                />
              }
            />
          ))}
        </FormGroup>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          선택됨: <strong>{CHECKBOX_ITEMS.filter((_, i) => checked[i]).join(', ') || '없음'}</strong>
        </Typography>

        {/* Radio 섹션 */}
        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          Radio
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack direction="row" spacing={6} alignItems="flex-start">
          <FormControl>
            <FormLabel>요금제 선택</FormLabel>
            <RadioGroup value={plan} onChange={(e) => setPlan(e.target.value)}>
              {PLAN_OPTIONS.map((option) => (
                <FormControlLabel key={option} value={option} label={option} control={<Radio />} />
              ))}
            </RadioGroup>
          </FormControl>
          <Typography variant="body1" color="text.secondary" sx={{ pt: 1 }}>
            선택된 요금제: <strong>{plan || '없음'}</strong>
          </Typography>
        </Stack>

        {/* Slider 섹션 */}
        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          Slider
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack spacing={3} sx={{ maxWidth: 500 }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 60 }}>
              현재 값
            </Typography>
            <Typography variant="h6" color="primary">
              {sliderValue}
            </Typography>
          </Stack>
          <Slider
            value={sliderValue}
            min={0}
            max={100}
            marks={[
              { value: 0, label: '0' },
              { value: 25, label: '25' },
              { value: 50, label: '50' },
              { value: 75, label: '75' },
              { value: 100, label: '100' },
            ]}
            valueLabelDisplay="auto"
            onChange={(_, val) => setSliderValue(val)}
          />
        </Stack>

        {/* Modal 섹션 */}
        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          Modal
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          모달 열기
        </Button>

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>확인이 필요합니다</DialogTitle>
          <DialogContent>
            <DialogContentText>
              이 작업을 진행하시겠습니까? 확인을 누르면 변경 사항이 저장됩니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>취소</Button>
            <Button variant="contained" onClick={() => setIsDialogOpen(false)}>확인</Button>
          </DialogActions>
        </Dialog>

        {/* Card 섹션 */}
        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          Card
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {CARD_DATA.map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card.id}>
              <Card
                elevation={hoveredCard === card.id ? 8 : 1}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{ transition: 'box-shadow 0.3s', cursor: 'pointer' }}
              >
                <CardMedia
                  sx={{ height: 100, bgcolor: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>
                    {card.title[0]}
                  </Typography>
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{card.desc}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">자세히</Button>
                  <Button size="small" color="secondary">저장</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Drag & Drop 섹션 */}
        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          Drag &amp; Drop
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack direction="row" spacing={3}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              아이템 목록 (드래그해서 이동)
            </Typography>
            <Paper
              variant="outlined"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDropToSource}
              sx={{ minHeight: 200, p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              {sourceItems.map((item) => (
                <Paper
                  key={item}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  elevation={2}
                  sx={{
                    p: 1.5,
                    cursor: 'grab',
                    bgcolor: draggingItem === item ? 'action.selected' : 'background.paper',
                    '&:active': { cursor: 'grabbing' },
                  }}
                >
                  <Typography variant="body2">⠿ {item}</Typography>
                </Paper>
              ))}
              {sourceItems.length === 0 && (
                <Typography variant="caption" color="text.disabled" sx={{ m: 'auto' }}>비어있음</Typography>
              )}
            </Paper>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              드롭 영역
            </Typography>
            <Paper
              variant="outlined"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDropToZone}
              sx={{ minHeight: 200, p: 2, display: 'flex', flexDirection: 'column', gap: 1, borderColor: 'primary.main', borderStyle: 'dashed' }}
            >
              {droppedItems.map((item) => (
                <Paper
                  key={item}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  elevation={2}
                  sx={{ p: 1.5, cursor: 'grab', bgcolor: 'primary.50' }}
                >
                  <Typography variant="body2" color="primary">✓ {item}</Typography>
                </Paper>
              ))}
              {droppedItems.length === 0 && (
                <Typography variant="caption" color="text.disabled" sx={{ m: 'auto' }}>여기에 드롭하세요</Typography>
              )}
            </Paper>
          </Box>
        </Stack>

        {/* Scroll 섹션 */}
        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          Scroll
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Paper
          variant="outlined"
          sx={{ height: 300, overflowY: 'auto', p: 2 }}
        >
          {SCROLL_ITEMS.map((item, index) => (
            <Box
              key={index}
              sx={{
                py: 1.5,
                px: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1, display: 'inline', fontWeight: 600 }}>
                {String(index + 1).padStart(2, '0')}
              </Typography>
              <Typography variant="body2" sx={{ display: 'inline' }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Paper>

        {/* Animation 섹션 */}
        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          Animation
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack spacing={4}>
          {/* Fade */}
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>Fade</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="outlined" onClick={() => handleAnimate(setFadeIn)}>
                재생
              </Button>
              <Box sx={{ width: 120, height: 60 }}>
                <Fade in={fadeIn} timeout={800}>
                  <Paper elevation={3} sx={{ width: '100%', height: '100%', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#fff' }}>Fade</Typography>
                  </Paper>
                </Fade>
              </Box>
            </Stack>
          </Box>

          {/* Grow */}
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>Grow</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="outlined" onClick={() => handleAnimate(setGrowIn)}>
                재생
              </Button>
              <Box sx={{ width: 120, height: 60 }}>
                <Grow in={growIn} timeout={600}>
                  <Paper elevation={3} sx={{ width: '100%', height: '100%', bgcolor: 'secondary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#fff' }}>Grow</Typography>
                  </Paper>
                </Grow>
              </Box>
            </Stack>
          </Box>

          {/* Slide */}
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>Slide</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="outlined" onClick={() => handleAnimate(setSlideIn)}>
                재생
              </Button>
              <Box sx={{ width: 120, height: 60 }}>
                <Slide in={slideIn} direction="right" timeout={500}>
                  <Paper elevation={3} sx={{ width: '100%', height: '100%', bgcolor: 'success.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#fff' }}>Slide</Typography>
                  </Paper>
                </Slide>
              </Box>
            </Stack>
          </Box>
        </Stack>

        {/* Menu 섹션 */}
        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          Menu
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack direction="row" spacing={3} alignItems="center">
          <Button variant="contained" onClick={(e) => setMenuAnchor(e.currentTarget)}>
            메뉴 열기
          </Button>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
          >
            {MENU_ITEMS.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => { setSelectedMenu(item.label); setMenuAnchor(null) }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
          <Typography variant="body1" color="text.secondary">
            선택된 메뉴: <strong>{selectedMenu || '없음'}</strong>
          </Typography>
        </Stack>

        {/* Flex Navigation 섹션 */}
        <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
          Flex Navigation
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: 60,
            bgcolor: '#2d3748',
            px: 3,
            borderRadius: 1,
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>
            MyWebsite
          </Typography>
          <Box sx={{ display: 'flex', gap: '15px' }}>
            {FLEX_NAV_ITEMS.map((item) => (
              <Typography
                key={item}
                component="span"
                sx={{
                  color: '#a0aec0',
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#fff' },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

      </Container>
    </Box>
  )
}

export default App
